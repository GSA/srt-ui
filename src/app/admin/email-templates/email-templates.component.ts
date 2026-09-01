import { Component, OnInit } from '@angular/core';
import { AdminManagementService } from '../../shared/services/admin-management.service';

interface EmailTemplate {
  id: number;
  templateKey: string;
  name: string;
  subject: string;
  body: string;
  description: string;
  isBuiltIn?: boolean;
  active?: boolean;
}

const EMAIL_FOOTER = `<hr style="border: none; border-top: 1px solid #dfe1e2; margin: 24px 0;" />
<table cellpadding="0" cellspacing="0" style="margin-top: 16px;">
  <tr>
    <td style="padding-right: 16px;"><img src="assets/gsa-logo-new.png" alt="GSA Logo" height="40" /></td>
    <td style="padding: 0 16px; vertical-align: middle;"><div style="width: 2px; height: 36px; background-color: #1a4480;"></div></td>
    <td><img src="assets/srt-logo.png" alt="SRT Logo" height="36" style="filter: brightness(0) saturate(100%) invert(17%) sepia(65%) saturate(2000%) hue-rotate(200deg) brightness(90%) contrast(95%);" /></td>
  </tr>
</table>`;

@Component({
  selector: 'app-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.scss'],
  standalone: false
})
export class EmailTemplatesComponent implements OnInit {

  // Loaded from the API. These used to be a hardcoded array here, which meant a
  // template could be edited for one send but never saved.
  templates: EmailTemplate[] = [];
  loadingTemplates = false;
  templateError = '';
  templateNotice = '';
  savingTemplate = false;

  // Creating a new template
  showNewTemplate = false;
  newTemplate = { name: '', subject: '', body: '', description: '' };

  // State
  selectedTemplate: EmailTemplate | null = null;
  editingSubject = '';
  editingBody = '';

  // Update notes (bullet points)
  updateNotes: string[] = [''];

  // Recipients
  recipientMode: 'all' | 'agency' | 'role' | 'inactive' = 'all';
  selectedAgency = '';
  selectedRole = '';
  inactivityDays = 60;
  agencies: any[] = [];
  roles = ['Administrator', 'SRT Program Manager', 'Section 508 Coordinator', 'CO/COR'];

  // Send flow
  confirmStep = 0; // 0 = not started, 1 = first warning, 2 = second warning, 3 = sending
  recipientCount = 0;
  sending = false;
  sendResult: { success: boolean; message: string } | null = null;

  constructor(private adminService: AdminManagementService) {}

  ngOnInit(): void {
    this.adminService.listAgencies().subscribe({
      next: (data) => { this.agencies = data.agencies || []; },
      error: () => {}
    });
    this.loadTemplates();
  }

  loadTemplates(): void {
    this.loadingTemplates = true;
    this.templateError = '';
    this.adminService.listEmailTemplates().subscribe({
      next: (data) => {
        this.templates = (data.templates || []).filter((t: EmailTemplate) => t.active !== false);
        this.loadingTemplates = false;
        // Keep the current selection pointing at the refreshed copy rather than
        // a stale object, so an edit made here is what gets sent.
        if (this.selectedTemplate) {
          const again = this.templates.find(t => t.id === this.selectedTemplate!.id);
          this.selectedTemplate = again || null;
          if (!again) { this.editingSubject = ''; this.editingBody = ''; }
        }
      },
      error: (err) => {
        this.templateError = err?.error?.error || 'Could not load email templates.';
        this.loadingTemplates = false;
      }
    });
  }

  /** Save edits to the selected template so they persist beyond this send. */
  saveTemplate(): void {
    if (!this.selectedTemplate) { return; }
    this.savingTemplate = true;
    this.templateNotice = '';
    this.templateError = '';
    this.adminService.updateEmailTemplate(this.selectedTemplate.id, {
      subject: this.editingSubject,
      body: this.editingBody
    }).subscribe({
      next: () => {
        this.savingTemplate = false;
        this.templateNotice = `Saved changes to ${this.selectedTemplate!.name}.`;
        this.loadTemplates();
      },
      error: (err) => {
        this.savingTemplate = false;
        this.templateError = err?.error?.error || 'Could not save the template.';
      }
    });
  }

  get newTemplateDisabled(): boolean {
    return this.savingTemplate
      || !this.newTemplate.name.trim()
      || !this.newTemplate.subject.trim()
      || !this.newTemplate.body.trim();
  }

  createTemplate(): void {
    if (this.newTemplateDisabled) { return; }
    this.savingTemplate = true;
    this.templateNotice = '';
    this.templateError = '';
    this.adminService.createEmailTemplate({
      name: this.newTemplate.name.trim(),
      subject: this.newTemplate.subject.trim(),
      body: this.newTemplate.body,
      description: this.newTemplate.description.trim()
    }).subscribe({
      next: (res) => {
        this.savingTemplate = false;
        this.templateNotice = `Created ${this.newTemplate.name.trim()}.`;
        this.newTemplate = { name: '', subject: '', body: '', description: '' };
        this.showNewTemplate = false;
        this.loadTemplates();
        if (res && res.template) { this.selectTemplate(res.template); }
      },
      error: (err) => {
        this.savingTemplate = false;
        this.templateError = err?.error?.error || 'Could not create the template.';
      }
    });
  }

  removeTemplate(t: EmailTemplate): void {
    const builtIn = t.isBuiltIn
      ? '\n\nThis is a built-in template, so it will be hidden rather than deleted and can be restored later.'
      : '';
    if (!confirm(`Remove the "${t.name}" template?${builtIn}`)) { return; }
    this.savingTemplate = true;
    this.adminService.deleteEmailTemplate(t.id).subscribe({
      next: (res) => {
        this.savingTemplate = false;
        this.templateNotice = res && res.deactivated
          ? `${t.name} has been hidden. It can be restored later.`
          : `${t.name} deleted.`;
        if (this.selectedTemplate && this.selectedTemplate.id === t.id) {
          this.selectedTemplate = null;
        }
        this.loadTemplates();
      },
      error: (err) => {
        this.savingTemplate = false;
        this.templateError = err?.error?.error || 'Could not remove the template.';
      }
    });
  }

  selectTemplate(template: EmailTemplate): void {
    this.selectedTemplate = template;
    this.editingSubject = template.subject;
    this.editingBody = template.body;
    this.sendResult = null;
    this.confirmStep = 0;
    this.updateNotes = [''];
    this.templateNotice = '';
    this.templateError = '';
    this.loadRecipientCount();
  }

  addNote(): void {
    this.updateNotes.push('');
  }

  removeNote(index: number): void {
    if (this.updateNotes.length > 1) {
      this.updateNotes.splice(index, 1);
    }
  }

  getUpdateNotesHtml(): string {
    const notes = this.updateNotes.filter(n => n.trim());
    if (notes.length === 0) return '<ul><li>[Add update notes]</li></ul>';
    return '<ul>' + notes.map(n => `<li>${n}</li>`).join('') + '</ul>';
  }

  getFullBody(): string {
    let body = this.editingBody;
    body = body.replace('{{days_inactive}}', String(this.inactivityDays));
    body = body.replace('{{update_notes}}', this.getUpdateNotesHtml());
    return body + EMAIL_FOOTER;
  }

  loadRecipientCount(): void {
    this.adminService.listUsers({
      status: this.recipientMode === 'inactive' ? '' : 'active',
      agency: this.recipientMode === 'agency' ? this.selectedAgency : undefined
    }).subscribe({
      next: (data) => {
        let users = data.users || [];
        if (this.recipientMode === 'role') {
          users = users.filter((u: any) => u.userRole === this.selectedRole);
        }
        this.recipientCount = users.length;
      },
      error: () => { this.recipientCount = 0; }
    });
  }

  onRecipientChange(): void {
    this.confirmStep = 0;
    this.loadRecipientCount();
  }

  startSend(): void {
    this.confirmStep = 1;
  }

  confirmFirst(): void {
    this.confirmStep = 2;
  }

  confirmSecond(): void {
    this.confirmStep = 3;
    this.send();
  }

  cancelSend(): void {
    this.confirmStep = 0;
  }

  send(): void {
    if (!this.selectedTemplate) return;
    this.sending = true;
    this.sendResult = null;

    const payload = {
      // The stable string key, not the numeric row id. Existing admin_audit_log
      // rows reference the key from when these templates were hardcoded, so
      // sending it keeps the send history continuous.
      templateId: this.selectedTemplate.templateKey || String(this.selectedTemplate.id),
      subject: this.editingSubject,
      body: this.getFullBody(),
      recipientMode: this.recipientMode,
      agency: this.recipientMode === 'agency' ? this.selectedAgency : undefined,
      role: this.recipientMode === 'role' ? this.selectedRole : undefined,
      inactivityDays: this.recipientMode === 'inactive' ? this.inactivityDays : undefined
    };

    this.adminService.sendBulkEmail(payload).subscribe({
      next: (res) => {
        this.sending = false;
        this.confirmStep = 0;
        this.sendResult = { success: true, message: `Email sent to ${res.sent} recipient(s).` };
      },
      error: (err) => {
        this.sending = false;
        this.confirmStep = 0;
        this.sendResult = { success: false, message: err.error?.error || 'Failed to send email.' };
      }
    });
  }
}

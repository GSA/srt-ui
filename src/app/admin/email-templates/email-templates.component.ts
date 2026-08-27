import { Component, OnInit } from '@angular/core';
import { AdminManagementService } from '../../shared/services/admin-management.service';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  description: string;
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

  templates: EmailTemplate[] = [
    {
      id: 'inactivity_warning',
      name: 'Inactivity Warning',
      subject: 'SRT Account Inactivity Notice',
      body: `<p>Hello,</p>
<p>Your SRT account has been inactive for {{days_inactive}} days. Per GSA policy, accounts that remain inactive for more than 90 days will be deactivated.</p>
<p>Please log in to SRT within the next 30 days to keep your account active:</p>
<p><a href="https://srt.app.cloud.gov">Log in to SRT</a></p>
<p>If your account is deactivated, you will need to request access again through the normal process.</p>
<p>Thank you,<br>SRT Team</p>`,
      description: 'Sent to users who have not logged in within the configured inactivity period.'
    },
    {
      id: 'deactivation_notice',
      name: 'Account Deactivated',
      subject: 'SRT Account Deactivated',
      body: `<p>Hello,</p>
<p>Your SRT account has been deactivated due to inactivity (no login for over 90 days).</p>
<p>If you need access to SRT again, please contact your Section 508 coordinator or submit a new access request.</p>
<p>Thank you,<br>SRT Team</p>`,
      description: 'Sent when a user account is deactivated due to prolonged inactivity.'
    },
    {
      id: 'update_announcement',
      name: 'Platform Update',
      subject: 'SRT Platform Update',
      body: `<p>Hello,</p>
<p>We have released updates to the Solicitation Review Tool. Here is what is new:</p>
{{update_notes}}
<p>Log in to check it out: <a href="https://srt.app.cloud.gov">SRT</a></p>
<p>Thank you,<br>SRT Team</p>`,
      description: 'Sent to all active users when a major platform update is released.'
    }
  ];

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
  }

  selectTemplate(template: EmailTemplate): void {
    this.selectedTemplate = template;
    this.editingSubject = template.subject;
    this.editingBody = template.body;
    this.sendResult = null;
    this.confirmStep = 0;
    this.updateNotes = [''];
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
      templateId: this.selectedTemplate.id,
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

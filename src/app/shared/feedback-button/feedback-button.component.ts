import { Component, Input } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';

/**
 * Feedback collection used on the solicitation detail page (and the manual
 * upload). Replaces the previous free-form textarea with a short structured
 * form so reviewer feedback turns into directly actionable data:
 *
 *   1. Was the verdict correct?  (Yes / No / Not sure)
 *   2. If not, what should it have been? (verdict picker)
 *   3. Why? (free text — required when "No")
 *
 * The structured answer is serialized into the feedback_text payload so the
 * existing API + admin UI keep working without a schema change. The backend's
 * LLM auto-summary picks up the structured form just as well as free text.
 */
@Component({
  selector: 'app-feedback-button',
  template: `
    @if (!submitted) {
      @if (!showForm) {
        <button class="usa-button usa-button--outline" (click)="showForm = true" style="font-size: 0.8rem;">
          Give Feedback
        </button>
      } @else {
        <div style="background: #f0f4f9; padding: 1rem 1.25rem; border-radius: 0.5rem; margin-top: 0.75rem;">
          <p style="font-size: 0.85rem; font-weight: 700; margin: 0 0 0.25rem;">Help us improve the model</p>
          <p style="font-size: 0.75rem; color: #1b1b1b; margin: 0 0 0.85rem; line-height: 1.4;">
            Your answers are reviewed by our team and help train the next version of the SRT classifier. For account questions or bug reports, please use Contact Us instead.
          </p>

          <fieldset style="border: none; padding: 0; margin: 0 0 0.85rem;">
            <legend style="font-size: 0.78rem; font-weight: 600; padding: 0; margin-bottom: 0.4rem;">Was this determination correct?</legend>
            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
              <button type="button"
                      class="fb-toggle"
                      [class.fb-toggle--active]="verdictAgreement === 'yes'"
                      (click)="verdictAgreement = 'yes'; suggestedVerdict = ''"
                      style="padding: 5px 12px; border: 1px solid #c9d6e2; background: #fff; border-radius: 999px; cursor: pointer; font-size: 0.75rem; font-weight: 600;"
                      [style.background]="verdictAgreement === 'yes' ? '#2e8540' : '#fff'"
                      [style.color]="verdictAgreement === 'yes' ? '#fff' : '#1b1b1b'"
                      [style.border-color]="verdictAgreement === 'yes' ? '#2e8540' : '#c9d6e2'">
                👍 Yes
              </button>
              <button type="button"
                      [class.fb-toggle--active]="verdictAgreement === 'no'"
                      (click)="verdictAgreement = 'no'"
                      style="padding: 5px 12px; border: 1px solid #c9d6e2; background: #fff; border-radius: 999px; cursor: pointer; font-size: 0.75rem; font-weight: 600;"
                      [style.background]="verdictAgreement === 'no' ? '#b41d1d' : '#fff'"
                      [style.color]="verdictAgreement === 'no' ? '#fff' : '#1b1b1b'"
                      [style.border-color]="verdictAgreement === 'no' ? '#b41d1d' : '#c9d6e2'">
                👎 No
              </button>
              <button type="button"
                      [class.fb-toggle--active]="verdictAgreement === 'unsure'"
                      (click)="verdictAgreement = 'unsure'; suggestedVerdict = ''"
                      style="padding: 5px 12px; border: 1px solid #c9d6e2; background: #fff; border-radius: 999px; cursor: pointer; font-size: 0.75rem; font-weight: 600;"
                      [style.background]="verdictAgreement === 'unsure' ? '#1b1b1b' : '#fff'"
                      [style.color]="verdictAgreement === 'unsure' ? '#fff' : '#1b1b1b'"
                      [style.border-color]="verdictAgreement === 'unsure' ? '#1b1b1b' : '#c9d6e2'">
                ❓ Not sure
              </button>
            </div>
          </fieldset>

          @if (verdictAgreement === 'no') {
            <div style="margin-bottom: 0.85rem;">
              <label for="fb-suggested" style="display: block; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.3rem;">What should the verdict have been?</label>
              <select id="fb-suggested" [(ngModel)]="suggestedVerdict"
                      style="width: 100%; padding: 6px 10px; border: 1px solid #1b1b1b; border-radius: 4px; font-size: 0.8rem; background: #fff;">
                <option value="">— Select —</option>
                <option value="Included">Included (508 language present)</option>
                <option value="Not Included">Not Included (508 language missing)</option>
                <option value="Not Applicable">Not Applicable (508 doesn't apply)</option>
                <option value="Cannot Evaluate">Cannot Evaluate (insufficient info)</option>
              </select>
            </div>
          }

          <div style="margin-bottom: 0.5rem;">
            <label for="fb-reason" style="display: block; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.3rem;">
              {{ verdictAgreement === 'no' ? 'Why? (required)' : 'Anything else you want the team to know? (optional)' }}
            </label>
            <textarea id="fb-reason"
                      [(ngModel)]="reasonText"
                      rows="3"
                      maxlength="1000"
                      [placeholder]="verdictAgreement === 'no' ? 'What did the model miss? Quote the relevant clause if helpful.' : 'Optional — leave blank if you have nothing to add.'"
                      style="width: 100%; border: 1px solid #1b1b1b; border-radius: 4px; padding: 0.5rem; font-size: 0.85rem; resize: vertical;"></textarea>
          </div>

          <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem; align-items: center;">
            <button class="usa-button" [disabled]="sending || !canSubmit()" (click)="submit()" style="font-size: 0.8rem;">
              {{ sending ? 'Sending...' : 'Submit' }}
            </button>
            <button class="usa-button usa-button--unstyled" (click)="reset()" style="font-size: 0.8rem;">Cancel</button>
          </div>
          @if (error) {
            <p style="color: #b41d1d; font-size: 0.8rem; margin-top: 0.5rem;" role="alert">{{ error }}</p>
          }
        </div>
      }
    } @else {
      <p style="font-size: 0.8rem; color: #2e8540; margin: 0.5rem 0;" role="status"><span aria-hidden="true">✓</span> Feedback submitted. Thank you!</p>
    }
  `,
  standalone: false
})
export class FeedbackButtonComponent {
  @Input() source: 'manual_upload' | 'solicitation_detail' | 'contact_us' = 'solicitation_detail';
  @Input() solicitationNumber: string = '';
  @Input() currentVerdict: string = '';

  showForm = false;
  verdictAgreement: '' | 'yes' | 'no' | 'unsure' = '';
  suggestedVerdict = '';
  reasonText = '';
  sending = false;
  submitted = false;
  error = '';

  constructor(private feedbackService: FeedbackService) {}

  canSubmit(): boolean {
    if (!this.verdictAgreement) return false;
    if (this.verdictAgreement === 'no') {
      return !!this.suggestedVerdict && this.reasonText.trim().length >= 5;
    }
    return true;
  }

  reset(): void {
    this.showForm = false;
    this.verdictAgreement = '';
    this.suggestedVerdict = '';
    this.reasonText = '';
    this.error = '';
  }

  submit(): void {
    this.sending = true;
    this.error = '';

    // Serialize the structured answer into a single feedback_text payload so
    // the existing /api/feedback contract and admin UI work unchanged. The
    // first line is machine-parseable; the rest is human-readable.
    const lines: string[] = [];
    lines.push(`Verdict shown: ${this.currentVerdict || 'unknown'}`);
    lines.push(`Reviewer agreement: ${this.verdictAgreement}`);
    if (this.verdictAgreement === 'no' && this.suggestedVerdict) {
      lines.push(`Suggested verdict: ${this.suggestedVerdict}`);
    }
    if (this.reasonText.trim()) {
      lines.push('');
      lines.push('Reviewer notes:');
      lines.push(this.reasonText.trim());
    }
    const payloadText = lines.join('\n');

    this.feedbackService.submitFeedback({
      source: this.source,
      feedback_text: payloadText,
      solicitation_number: this.solicitationNumber || undefined
    }).subscribe({
      next: () => {
        this.sending = false;
        this.submitted = true;
      },
      error: (err) => {
        this.sending = false;
        this.error = err.error?.error || 'Failed to submit feedback.';
      }
    });
  }
}

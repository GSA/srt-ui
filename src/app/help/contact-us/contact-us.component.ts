import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../shared/services/feedback.service';
import { BaseComponent } from '../../base.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  standalone: false
})
export class ContactUsComponent extends BaseComponent implements OnInit {

  myForm: FormGroup;
  emailSent = false;
  sending = false;
  error = '';
  userEmail = '';

  constructor(
    private feedbackService: FeedbackService,
    private ts: Title
  ) {
    super(ts);
    this.pageName = 'SRT - Contact Us';
  }

  ngOnInit() {
    super.ngOnInit();

    // Get email from localStorage (set during login)
    this.userEmail = localStorage.getItem('email') || '';

    this.myForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl({ value: this.userEmail, disabled: !!this.userEmail }, [Validators.required, Validators.email]),
      content: new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
  }

  onSubmit(): void {
    if (!this.myForm.valid) return;

    this.sending = true;
    this.error = '';

    const email = this.userEmail || this.myForm.value.email;
    const message = `From: ${this.myForm.value.name} (${email})\n\n${this.myForm.getRawValue().content}`;

    this.feedbackService.submitFeedback({
      source: 'contact_us',
      feedback_text: message
    }).subscribe({
      next: () => {
        this.sending = false;
        this.emailSent = true;
      },
      error: (err) => {
        this.sending = false;
        this.error = err.error?.error || 'Failed to send message. Please try again.';
      }
    });
  }

  resetForm(): void {
    this.emailSent = false;
    this.myForm.reset();
    this.myForm.patchValue({ email: this.userEmail });
  }
}

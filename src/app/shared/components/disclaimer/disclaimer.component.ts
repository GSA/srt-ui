import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable SRT legal/informational disclaimer.
 *
 * Usage:
 *   <app-disclaimer></app-disclaimer>                     // short (default)
 *   <app-disclaimer variant="short" [showFullLink]="true"></app-disclaimer>
 *   <app-disclaimer variant="long"></app-disclaimer>      // full text (FAQ)
 */
@Component({
  selector: 'app-disclaimer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss'],
})
export class DisclaimerComponent {
  /** 'short' for the summary blurb, 'long' for the full statement. */
  @Input() variant: 'short' | 'long' = 'short';

  /** When true (and variant is short), show the inline expand toggle. */
  @Input() showFullLink = true;

  /** Whether the full disclaimer text is currently expanded inline. */
  expanded = false;
}

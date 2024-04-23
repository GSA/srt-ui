import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-art-iframe-dialog',
  templateUrl: './art-iframe-dialog.component.html',
  styleUrls: ['./art-iframe-dialog.component.css']
})
export class ArtIframeDialogComponent {
  visible: boolean = false;
  url = 'https://section508.gov/art'
  art_url: SafeResourceUrl | undefined;;

  constructor(
    public sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.art_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  showDialog() {
      this.visible = true;
  }
}

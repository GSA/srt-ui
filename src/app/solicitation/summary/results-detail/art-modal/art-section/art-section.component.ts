import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-art-section',
  templateUrl: './art-section.component.html',
  styleUrls: ['./art-section.component.css']
})
export class ArtSectionComponent {
  @Input() section: any;
}

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { ArtService } from './art.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-art-modal',
  templateUrl: './art-modal.component.html',
  styleUrls: ['./art-modal.component.css'],
})
export class ArtIframeDialogComponent {
  visible: boolean = false;
  url = 'https://section508.gov/art'
  art_url: SafeResourceUrl | undefined;
  art_language: any

  selectedCategories: string[] = [];


  categories: any[] = [
    { name: 'Electronic Content', art_api: 'electronic_content'},
    { name: 'Website Content', art_api: 'website_content'},
    { name: 'Public Content', art_api: 'public_content'},
    { name: 'Official Communication', art_api: 'official_communication'},
    { name: 'Web Software', art_api: 'software_web'},
    { name: 'Create electonic Content', art_api: 'create_electronic_content'}

    ];

  constructor(
    public sanitizer: DomSanitizer,
    private artService: ArtService,
  ) {

  }

  ngOnInit() {
  }

  showDialog() {
      this.visible = true;
  }

  onSubmit(): void {
    // Process ART data here
    //this.selectedCategories = this.formGroup.get('selectedCategories').value;
    //console.log('This is your form:', form);
    console.warn('Your order has been submitted', this.selectedCategories);
    
    
    this.artService.getArtLanguage(this.selectedCategories)
      .subscribe(
        data => {
          this.art_language = data;
        }
      );
      
      console.log('Art Language:', this.art_language)
  }
}

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';

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
  display: string

  selectedCategories: string[] = [];
  selectedSubcategories: string[] = [];

  categories: any[] = [
    { name: 'ICT Type', art_api: 'ict_type', 
      subcategories: [
        { name: 'ICT Products', art_api: 'ict_products'},
        { name: 'ICT Services', art_api: 'ict_services'},
        { name: 'None of the above', art_api: 'unknown'}
    ]},
    { name: 'Exemptions & Exceptions', art_api: 'exemptions_exceptions', 
      subcategories: [
        {name: 'No exemptions apply', art_api: 'no_exemptions'},
        {name: 'National Secuirty Exemption', art_api: 'national_security'},
        {name: 'Undue Burden Exemption', art_api: 'undue_burden'},
        {name: 'ICT Functions Located in Maintenance and Monitoring Spaces Exception', art_api: 'ict_functions'},
        {name: 'Fundamental Alteration Exception', art_api: 'fundamental_alteration'},
        {name: 'Federal Contracts Exception', art_api: 'federal_contracts'},
        {name: 'Unknown', art_api: 'unknown'},
    ]},
    { name: 'Electronic Content', art_api: 'electronic_content', 
      subcategories: [
        {name: 'Available through a website', art_api: 'website_content'},
        {name: 'Product is public facing', art_api: 'public_content'},
        {name: 'Agency official communication', art_api: 'official_communication'},
    ]},
    { name: 'Software Criteria', art_api: 'software_criteria', 
      subcategories: [
        {name:'No end-user interface', art_api: 'no_end_user_interface'},
        {name:'Assistive Technology', art_api: 'assistive_technology'},
        {name: 'Web, desktop, server, mobile client applications', art_api: 'web_desktop_server_mobile'},
        {name: 'Software authoring tools and platforms', art_api: 'software_authoring_tools'},
        {name: 'Software Infrastructure', art_api: 'software_infrastructure'},
        {name: 'Other', art_api: 'Other'},
        {name: 'Unknown', art_api: 'unknown'},
    ]},
    { name: 'Cloud Services', art_api: 'cloud_services', 
      subcategories: [
        {name: 'Software as a Service (SaaS)', art_api: 'saas'},
        {name: 'Platform as a Service (PaaS)', art_api: 'paas'},
        {name: 'Other Cloud Services arrangement', art_api: 'other_cloud_services', 
          subcategories: [
            {name: 'Accessed Through the Web', art_api: 'accessed_through_web'},
            {name: 'Creating Electronic Content', art_api: 'creating_electronic_content'},
          ]},
    ]},
    { name: 'Hardware', art_api: 'hardware', 
      subcategories: [
        {name: 'Computers and laptops', art_api: 'computers_and_laptops'},
        {name: 'Tablet', art_api: 'tablet'},
        {name: 'Printers, Scanners, or Copiers', art_api: 'printers_scanners_copiers'},
        {name: 'Multi-function office machines', art_api: 'multi_function_office_machines'},
        {name: 'Peripheral Equipment (i.e. keyboard, mouse)', art_api: 'peripheral_equipment'},
        {name: 'Information kiosks and transaction machines', art_api: 'information_kiosks_transaction_machines'},
        {name: 'Mobile phones', art_api: 'mobile_phones'},
        {name: 'Video Teleconference Equipment', art_api: 'video_teleconference_equipment'},
        {name: 'Video Displays or Monitors', art_api: 'video_displays_monitors'},
        {name: 'Servers', art_api: 'servers'},
        {name: 'Other', art_api: 'other'},
        {name: 'Unknown', art_api: 'Unknown'},
    ]},
    { name: 'Support Documentation & Services', art_api: 'support_documentation_services', 
      subcategories: [
        {name: 'Automated self-service & Technical support', art_api: 'automated_self_service_technical_support'},
        {name: 'Help Desk or Call service center', art_api: 'help_desk_call_service_center'},
        {name: 'Product documentation', art_api: 'product_documentation'},
        {name: 'Training Service', art_api: 'training_service'},
        {name: 'None of the above', art_api: 'none_of_the_above'},
      ]
    }

    ];

  /*
  categories: any[] = [
    { name: 'Electronic Content', art_api: 'electronic_content'},
    { name: 'Website Content', art_api: 'website_content'},
    { name: 'Public Content', art_api: 'public_content'},
    { name: 'Official Communication', art_api: 'official_communication'},
    { name: 'Web Software', art_api: 'software_web'},
    { name: 'Create electonic Content', art_api: 'create_electronic_content'}

    ];
    */

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
          console.log('Art Language Data:', data)
          this.art_language = data;

          if (data) {
            this.display = 'inherit'
          }

        }
      );
      
      console.log('Art Language:', this.art_language)
  }

  clearAll() {
    this.selectedCategories = [];
    this.selectedSubcategories = [];
    this.display = 'none';
    this.art_language = null;
  }

  copyToClipBoard(elem) {
    navigator.clipboard.writeText(elem.innerText)
      .then(() => {
        console.log('Text copied to clipboard');
        // Additional code after copying to clipboard
      })
      .catch((error) => {
        console.error('Failed to copy text to clipboard:', error);
        // Handle error if copying to clipboard fails
      });
  }

  makeAndDownloadDocument(elem){
    const text = elem.innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'art_language.txt';
    link.click();

    URL.revokeObjectURL(url);
  }

}

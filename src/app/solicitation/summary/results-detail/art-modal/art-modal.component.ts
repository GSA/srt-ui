import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';

import { ArtService } from './art.service';
import { SolicitationService } from '../../../solicitation.service';
import { ActivatedRoute } from '@angular/router';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-art-modal',
  templateUrl: './art-modal.component.html',
  styleUrls: ['./art-modal.component.scss'],
})
export class ArtIframeDialogComponent {

  
  visible: boolean = false;
  shouldClearSubcategories: boolean = false;
  solicitationId: string;

  url = 'https://section508.gov/art'
  art_url: SafeResourceUrl | undefined;
  art_language: any
  display: string
  alert_display: string
  warning_alert_display: string
  warning_api_error: string[]


  art_body: any = {}
  
  selectedCategories: any[] = [];
  selectedSubcategories: any[] = [];

  fieldNames: { [key: string]: string } = {};
  categories: any[] = [
    { name: 'ICT Type', art_api: 'ict_type', type: 'array',
      subcategories: [
        { name: 'ICT Products', art_api: 'it-prod'},
        { name: 'ICT Services', art_api: 'it-serv'},
        { name: 'None of the above', art_api: 'it-none'}
    ]},
    { name: 'Exemptions & Exceptions', art_api: 'exceptions', type: 'array',
      subcategories: [
        //{name: 'No exemptions apply', art_api: 'no_exemptions'}, Do we need?
        {name: 'National Secuirty Exemption', art_api: 'excep-nat-sec'},
        {name: 'Undue Burden Exemption', art_api: 'excep-und-bur'},
        {name: 'ICT Functions Located in Maintenance and Monitoring Spaces Exception', art_api: 'excep-mon-spa'},
        {name: 'Fundamental Alteration Exception', art_api: 'excep-alter'},
        {name: 'Federal Contracts Exception', art_api: 'excep-fed-con'},
        //{name: 'Unknown', art_api: 'unknown'},
    ]},
    { name: 'Electronic Content', art_api: 'electronic_content', type:'object',
      subcategories: [
        {name: 'Available through a website', art_api: 'is_website'},
        {name: 'Product is public facing', art_api: 'is_public'},
        {name: 'Agency official communication', art_api: 'is_official_communication'},
    ]},
    { name: 'Software', art_api:'software_group', type:'object',
      subcategories: [
        { name: 'Software Criteria', art_api: 'software_criteria', type: 'array',
          subcategories: [
            {name:'Assistive Technology', art_api: 'assistive-technology'},
            {name:'No end-user interface', art_api: 'no-user-interface'},
            {name: 'Unknown', art_api: 'idk_software'},
          ]
         },
         {name: 'Accessible Through a Web Browser', art_api: "software_web"},
         {name:'Electronic Authoring Tool', art_api: 'create_electronic_content'},
         {name: 'Cloud Services', art_api: 'cloud_services', type: 'array',
         subcategories: [
          {name: 'Software as a Service (SaaS)', art_api: 'saas'},
          {name: 'Platform as a Service (PaaS)', art_api: 'paas'},
          {name: 'Other Cloud Services arrangement', art_api: 'other'},
          {name: 'Unknown', art_api: 'idk_cloud'},
          ]
         },
         {name: 'Software Purchases', art_api: 'software_purchase', type: 'array',
          subcategories: [
            {name: 'Web, desktop, server, mobile client applications', art_api: 'web-app'},
            {name: 'Software authoring tools and platforms', art_api: 'auth-tool'},
            {name: 'Software Infrastructure', art_api: 'software-infrastructure'},
            {name: 'Other', art_api: 'other'},
          ]
         }
      ]
    },    
    { name: 'Hardware', art_api: 'hardware_group', type: 'object',
      subcategories: [
        {name: 'Hardware Items', art_api: 'hardware_items', type: 'array',
          subcategories: [
            {name: 'Computers and laptops', art_api: 'computer'},
            {name: 'Tablet', art_api: 'tablet'},
            {name: 'Printers, Scanners, or Copiers', art_api: 'printers_scanners_copiers'},
            {name: 'Multi-function office machines', art_api: 'multi-functional'},
            {name: 'Peripheral Equipment (i.e. keyboard, mouse)', art_api: 'peripheral'},
            {name: 'Information kiosks and transaction machines', art_api: 'kiosk'},
            {name: 'Mobile phones', art_api: 'mobile'},
            {name: 'Video Teleconference Equipment', art_api: 'video-teleconference-equipment'},
            {name: 'Video Displays or Monitors', art_api: 'video-monitor'},
            {name: 'Other', art_api: 'other'},
            {name: 'None of the above', art_api: 'none'},
          ]
        },
        {name: 'Server is the physical installation or an Infrastructure as a Service (IaaS)', art_api: 'server_iaas'},
    ]},
    { name: 'Support Documentation & Services', art_api: 'support', type:'array',
      subcategories: [
        {name: 'Automated self-service & Technical support', art_api: 'technical'},
        {name: 'Help Desk or Call service center', art_api: 'call'},
        {name: 'Product documentation', art_api: 'doc'},
        {name: 'Training Service', art_api: 'training'},
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
    private solicitationService: SolicitationService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    // Subscribe to the params Observable to access the URL parameter
    this.route.params.subscribe(params => {
      this.solicitationId = params['id']; // Replace 'id' with the actual parameter name
    });

    const buildFieldNameMapping = (categories: any[]): { [key: string]: string } => {
      const mapping: { [key: string]: string } = {};
    
      const traverseCategories = (categories: any[]) => {
        categories.forEach(category => {
          if (category.art_api && category.name) {
            mapping[category.art_api] = category.name;
          }
          if (category.subcategories) {
            traverseCategories(category.subcategories);
          }
        });
      };
    
      traverseCategories(categories);
      return mapping;
    };

    this.fieldNames = buildFieldNameMapping(this.categories);

  }
  

  showDialog() {
      this.visible = true;
  }

  processCategory(category){
    console.log('category (processCategory):', category)

    let artBody = {}

    if (category.type === 'array') {
      artBody[category.art_api] = category.subcategories.filter(subcategory => {
        return this.isSubcategorySelected(subcategory.art_api);
      }).map(subcategory => {
          return subcategory.art_api.startsWith('idk') ? 'idk' : subcategory.art_api;
        });
    }
    else if (category.type === 'object') {

      artBody[category.art_api] = {}

      category.subcategories.forEach(subcategory => {
        if (this.isSubcategorySelected(subcategory.art_api)) {
          Object.assign(artBody[category.art_api], this.processCategory(subcategory));
        }
      })
    }
    else { 
      artBody[category.art_api] = true
    }

    console.log('Art Body (processCategory):', artBody)

    return artBody

  }

  createARTBody(){
    // Make ART JSON body in structure shown above
    //console.log('selected Categories:', this.selectedCategories)
    //console.log('selected SubCategories:', this.selectedSubcategories)
    
    this.categories.forEach(category => {

      if (this.isCategorySelected(category.art_api)) {
        this.art_body = Object.assign(this.art_body, this.processCategory(category));
      } else {
        return
      }
    });

  }

  onSubmit(): void {
    // Process ART data here
    console.log('Selected Categories:', this.selectedCategories)
    console.log('Selected Subcategories:', this.selectedSubcategories)

    if (this.selectedCategories.length === 0 && this.selectedSubcategories.length === 0) {
      this.alert_display = 'inherit'
      return
    }

    this.alert_display = 'none'
    this.warning_alert_display = 'none'
    
    this.createARTBody()

    console.log('Art Body:', this.art_body)


    this.artService.getArtLanguage(this.art_body)
      .subscribe({
        next: data => {
          console.log('Art Language Data:', data)
          this.art_language = data;

          if (data) {
            this.display = 'inherit'
            this.solicitationService.postSolicitationART(this.solicitationId, data).subscribe({
              next: (response) => console.log('Post Solicitation ART Response:', response),
              error: (error) => console.error('Post Solicitation ART Error:', error)
            })

          }

        },
        error: error => {
          let errors: string[] = [];

          const replaceFieldNames = (error: string, fieldNames: { [key: string]: string }): string => {
            return error.replace(/'([^']+)'/g, (match, p1) => {
              console.log('Match:', match)
              console.log('P1:', p1)
              const parts = p1.split('.');
              const art_api = parts[parts.length - 1];
              return fieldNames[art_api] ? `'${fieldNames[art_api]}'` : match;
            });
          };

          error.forEach(item => {
            const friendlyMessage = replaceFieldNames(item, this.fieldNames);
            errors.push(friendlyMessage);
          })

          this.warning_alert_display = 'inherit';
          this.warning_api_error = errors;
          
          console.error('Error:', error)
        }
      });
      
      console.log('Art Language:', this.art_language)
  }

  clearAll() {
    this.selectedCategories = [];
    this.selectedSubcategories = [];
    this.display = 'none';
    this.art_language = null;

    this.categories.forEach(category => {
      category.isChecked = false
      
      if (category.subcategories) {
        category.subcategories.forEach(subcategory => {
          subcategory.isChecked = false
        })
      }
    
    });
    this.shouldClearSubcategories = true;

    // Reset the flag after a tick to allow re-triggering if needed
    setTimeout(() => this.shouldClearSubcategories = false, 0);

  }

  onParentChange(category) {
    if (!this.selectedCategories.some(item => item.art_api === category.art_api)) {
      this.selectedSubcategories = this.selectedSubcategories.filter(subcategory => {
        // Check if the subcategory is in the subcategories of the category that was unchecked
        return !category.subcategories.map(sub => sub.art_api).includes(subcategory);
      });
    } 
  }

  onCategoryChange(selected) {
    console.log('Selected:', selected)

    this.selectedCategories = selected.selectedCategories;
    let parent = selected.parent;

    if (parent) {
      // Remove all subcategories from selectedSubcategories that have the same parent as the selected subcategory
      this.selectedSubcategories = this.selectedSubcategories.filter(item => item.parent !== parent);
        
      this.selectedSubcategories = [...this.selectedSubcategories, ...selected.selectedSubcategories];

    } 

    console.log('Selected Subcategories:', this.selectedSubcategories)
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

  saveLanguageInDatabase(){
    this.solicitationService.postSolicitationART(this.solicitationId, this.art_language)
  }

  updateLanguage() {
    const dialog = document.getElementsByClassName('p-dialog-content')[0];
    if (dialog) {
      dialog.scrollTop = 0; // Scroll to top of the dialog
    }

    this.art_language = []; // Remove art language
    this.display = 'none';
  }

  isSubcategorySelected(subcategoryArtApi: string): boolean {
    return this.selectedSubcategories && this.selectedSubcategories.some(item => item.art_api === subcategoryArtApi);
  }

  isCategorySelected(categoryArtApi: string): boolean {
    return this.selectedCategories && this.selectedCategories.some(item => item.art_api === categoryArtApi);
  }

}

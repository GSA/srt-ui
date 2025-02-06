import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { AuthGuard } from '../../auth-guard.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base.component';
import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { FileUploadService } from '../../services/file-upload.service';
import * as mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { ArtIframeDialogComponent } from '../../solicitation/summary/results-detail/art-modal/art-modal.component';
import { ArtService } from '../../solicitation/summary/results-detail/art-modal/art.service';
import fileInput from '@uswds/uswds/js/usa-file-input';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.js';

interface FileWithUI extends File {
  showText?: boolean;
}

interface AnalysisResult {
  status: 'compliant' | 'non-compliant';
  text: string;
  details: {
    prediction: number;
    decisionBoundary: number;
  };
  error?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [FileUploadService],
})
export class HomeComponent
  extends BaseComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  currentID: string;
  isGSAAdmin = false;
  selectedFiles: FileWithUI[] = [];
  uploading = false;
  processingFile = false;
  isDragging = false;
  analysisComplete = false;
  artResponse: any;
  Object = Object;

  results: { [key: string]: AnalysisResult } = {};
  extractedTexts: { [key: string]: string } = {};
  solicitationData: any = null;

  private adminCheckTimes = 0;
  private interval: any;

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild(ArtIframeDialogComponent) artModal: ArtIframeDialogComponent;
  @ViewChild('infiniteTilesContainer') infiniteTilesContainer: ElementRef;

  constructor(
    private auth: AuthGuard,
    private router: Router,
    private titleService: Title,
    private $gaService: GoogleAnalyticsService,
    private fileUploadService: FileUploadService,
    private artService: ArtService
  ) {
    super(titleService);
  }

  ngOnInit() {
    console.log('UI: Initializing component.');
    this.setupInitialState();
    this.checkAdminStatus();
    this.fetchArtLanguage();
  }

  ngAfterViewInit() {
    console.log('UI: View initialized.');
    this.initializeFileInput();
    this.initializeInfiniteTiles();
  }

  ngOnDestroy() {
    console.log('UI: Component destroyed.');
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onClickTiles(action: string, label: string) {
    console.log(`UI: Tile clicked - Action: ${action}, Label: ${label}`);
    this.$gaService.event(action, 'home_tiles', label);
  }

  private setupInitialState() {
    console.log('UI: Setting up initial state.');
    this.loadAdminComponents();
    this.currentID = localStorage.getItem('id');
    this.pageName = 'SRT Home Page';
    super.ngOnInit();
  }

  private loadAdminComponents() {
    this.isGSAAdmin = this.auth.checkAdmin();
    console.log('UI: GSA Admin status:', this.isGSAAdmin);
  }

  private checkAdminStatus() {
    this.interval = setInterval(() => {
      this.loadAdminComponents();
      console.log('UI: Checking admin status. Attempt:', this.adminCheckTimes);
      if (this.adminCheckTimes > 1) {
        clearInterval(this.interval);
      }
      this.adminCheckTimes++;
    }, 2000);
  }

  private fetchArtLanguage() {
    console.log('UI: Fetching ART language.');
    const requestBody = { solicitation_phase: 'solicitation-development' };
    this.artService.getArtLanguage(requestBody).subscribe({
      next: (response) => {
        console.log('UI: ART language fetched successfully:', response);
        this.artResponse = response;
      },
      error: (err) => {
        console.error('UI: ART API Error:', err);
      },
    });
  }

  private initializeFileInput() {
    console.log('UI: Initializing file input.');
    const fileInputEl = document.getElementById('file-input-multiple');
    if (fileInputEl) {
      fileInput.on(fileInputEl);
    }
  }
  /**
   * Duplicates the tile items and sets up a scroll listener to reset the scroll position
   * when the user reaches half of the scrollable width.
   */
  private initializeInfiniteTiles(): void {
    const container: HTMLElement = this.infiniteTilesContainer.nativeElement;
    // Duplicate the tile items by appending a clone of the content.
    container.innerHTML += container.innerHTML;
    
    // Attach our updated scroll event listener.
    container.addEventListener('scroll', this.onInfiniteScroll.bind(this));
  }
  

  /**
   * Handles the scroll event to create an infinite scroll effect.
   */
  private onInfiniteScroll(): void {
    const container: HTMLElement = this.infiniteTilesContainer.nativeElement;
    const halfScrollWidth = container.scrollWidth / 2;
  
    // When scrolling right: if the scrollLeft reaches the end of the first half, subtract halfScrollWidth.
    if (container.scrollLeft >= halfScrollWidth) {
      container.scrollLeft -= halfScrollWidth;
    }
    // When scrolling left: if scrollLeft is at or near 0, add halfScrollWidth.
    else if (container.scrollLeft <= 0) {
      container.scrollLeft += halfScrollWidth;
    }
  }
  

  async onFileSelect(event: any) {
    const files: FileWithUI[] = Array.from(event.target.files || []);
    console.log('UI: Files selected:', files.map((file) => file.name));
    if (!files.length) return;

    const newFiles = this.filterNewFiles(files);
    this.initializeNewFiles(newFiles);
    await this.processNewFiles(newFiles);

    this.$gaService.event(
      'file_select',
      'compliance_check',
      `Files Selected: ${this.selectedFiles.length}`
    );
  }

  private filterNewFiles(files: FileWithUI[]): FileWithUI[] {
    return files.filter(
      (newFile) =>
        !this.selectedFiles.some(
          (existingFile) => existingFile.name === newFile.name
        )
    );
  }

  private initializeNewFiles(newFiles: FileWithUI[]) {
    console.log('UI: Initializing new files:', newFiles.map((file) => file.name));
    newFiles.forEach((file) => {
      file.showText = false;
    });
    this.selectedFiles = [...this.selectedFiles, ...newFiles];
    this.processingFile = true;
  }

  private async processNewFiles(newFiles: FileWithUI[]) {
    for (const file of newFiles) {
      try {
        console.log(`UI: Processing file: ${file.name}`);
        if (!this.fileUploadService.validateFileType(file)) {
          throw new Error('Invalid file type');
        }
        const text = await this.extractText(file);
        console.log(`UI: Extracted text for ${file.name}:`, text.slice(0, 100)); // Log first 100 chars
        this.extractedTexts[file.name] = text;
      } catch (err) {
        console.error(`UI: Error extracting text from ${file.name}:`, err);
        this.extractedTexts[file.name] = `Error: ${err.message}`;
      }
    }
    this.processingFile = false;
  }

  async uploadFiles() {
    if (!this.selectedFiles.length) return;

    this.uploading = true;
    console.log('UI: Uploading files with extracted text:', this.extractedTexts);
    try {
      this.results = await this.fileUploadService.analyzeDocuments(
        this.extractedTexts
      );
      console.log('UI: Analysis results:', this.results);
      this.prepareSolicitationData();
      this.analysisComplete = true;
    } catch (error) {
      console.error('UI: Analysis failed:', error);
    } finally {
      this.uploading = false;
    }
  }

  private prepareSolicitationData() {
    const solId = `SOL-${Date.now()}`;
    console.log('UI: Preparing solicitation data. Solicitation ID:', solId);
    this.solicitationData = {
      id: solId,
      title: 'Manual Compliance Review',
      solNum: solId,
      reviewRec: Object.values(this.results).some(
        (r) => r.status === 'compliant'
      )
        ? 'Compliant'
        : 'Non-compliant',
      date: new Date(),
      noticeType: 'Manual Upload',
      category_list: { value: 'Yes' },
      noticeData: { psc: 'N/A' },
      agency: 'Agency Name',
      office: 'Office Name',
      contactInfo: ['Contact Person'],
      active: true,
      parseStatus: this.selectedFiles.map((file) => ({
        name: file.name,
        attachment_url: '#',
        formattedDate: new Date().toLocaleDateString(),
        status: this.results[file.name]?.status || 'Non-compliant',
      })),
    };
    localStorage.setItem(
      'currentSolicitation',
      JSON.stringify(this.solicitationData)
    );
  }

  goToResults() {
    console.log('UI: Navigating to results page.');
    this.router.navigate(['/solicitation/manual-review'], {
      queryParams: { source: 'manual' },
      state: { solicitation: this.solicitationData },
    });
  }

  removeFile(fileToRemove: FileWithUI) {
    console.log('UI: Removing file:', fileToRemove.name);
    this.selectedFiles = this.selectedFiles.filter(
      (file) => file.name !== fileToRemove.name
    );
    delete this.extractedTexts[fileToRemove.name];
    delete this.results[fileToRemove.name];
  }

  isNonCompliant(status: string): boolean {
    return status?.toLowerCase() === 'non-compliant';
  }

  private async extractText(file: File): Promise<string> {
    console.log('UI: Extracting text for file:', file.name);
    if (file.type === 'application/pdf') {
      return this.extractPdfText(file);
    } else if (
      file.type === 'application/msword' ||
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return this.extractWordText(file);
    } else if (file.type === 'text/plain') {
      return this.extractTxtText(file);
    }
    throw new Error('Unsupported file type');
  }

  private async extractTxtText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Error reading the text file'));
      reader.readAsText(file);
    });
  }  
  

  private async extractPdfText(file: File): Promise<string> {
    console.log('UI: Extracting text from PDF:', file.name);
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      console.log(`UI: Extracting text from page ${i} of ${pdf.numPages}`);
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(' ') + '\n';
    }

    return text;
  }

  resetAnalysis(): void {
    console.log('UI: Resetting analysis state');
    
    // Reset file collections
    this.selectedFiles = [];
    this.extractedTexts = {};
    this.results = {};
    
    // Reset state flags
    this.uploading = false;
    this.processingFile = false;
    this.analysisComplete = false;
    this.isDragging = false;
    
    // Clear and reinitialize file input
    const fileInputEl = document.getElementById('file-input-multiple');
    if (fileInputEl) {
      // Remove the USWDS instance
      fileInput.off(fileInputEl);
      // Reset the native input value
      (fileInputEl as HTMLInputElement).value = '';
      // Create a new instance
      fileInput.on(fileInputEl);
    }

    // Clear solicitation data
    this.solicitationData = null;
    localStorage.removeItem('currentSolicitation');

    // Log analytics
    this.$gaService.event('reset_analysis', 'compliance_check', 'Analysis Reset');
  }

  private async extractWordText(file: File): Promise<string> {
    console.log('UI: Extracting text from Word document:', file.name);
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  handleDrag(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = event.type === 'dragenter' || event.type === 'dragover';
    console.log('UI: Drag event detected:', event.type);
  }

  handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    console.log('UI: Drop event detected.');
    if (event.dataTransfer?.files) {
      const files = Array.from(event.dataTransfer.files) as FileWithUI[];
      const validFiles = files.filter((file) =>
        this.fileUploadService.validateFileType(file)
      );
      console.log('UI: Files dropped:', validFiles.map((file) => file.name));
      if (validFiles.length) {
        this.onFileSelect({ target: { files: validFiles } } as any);
      }
    }
  }
}

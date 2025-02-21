import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

interface DocumentAnalysisResult {
  status: 'compliant' | 'non-compliant';
  text: string;
  details: {
    prediction: number;
    decisionBoundary: number;
  };
  error?: string;
}

@Injectable()
export class FileUploadService {
  private apiUrl = `${environment.SERVER_URL}/analyze-documents`;

  constructor(private http: HttpClient) {}

  async analyzeDocuments(documents: { [filename: string]: string }): Promise<{ [key: string]: DocumentAnalysisResult }> {
    return firstValueFrom(
      this.http.post<{ [key: string]: DocumentAnalysisResult }>(
        this.apiUrl,
        { documents },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }
        }
      )
    );
  }

  validateFileType(file: File): boolean {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    return allowedTypes.includes(file.type);
  }
}
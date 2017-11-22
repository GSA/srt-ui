import { Component, OnInit, Directive, Input } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';

import { AuthService } from '../../services/auth.service';
import { FileUploader } from 'ng2-file-upload';



@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
@Directive({ selector: '[ng2FileSelect]' })

export class UploadComponent implements OnInit {
  
  @Input() uploadDirectly;
  @Input() currentId
  public uploader: FileUploader = new FileUploader({});
  public fileString = {}
  public hasBaseDropZoneOver: Boolean = false;
  public hasAnotherDropZoneOver: Boolean = false;

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  /**
 * On Init.
 */
  ngOnInit() {
    const url = environment.FILE_UPLOAD_API;
    
    this.uploader.setOptions({
      url : url,
      authToken: this.currentId = ' '+ this.authService.getToken(),
    });
    this.uploader.uploadAll();
  }

  /**
  * On Changes.
  */
  ngOnChanges(){
    

  }


   
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}

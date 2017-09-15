import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth-guard.service';

@Component({
  selector: 'app-srt',
  templateUrl: './srt.component.html',
  styleUrls: ['./srt.component.css']
})
export class SrtComponent implements OnInit {

  isGSAAdmin = false;
  constructor(
    private auth: AuthGuard
  ) { }


  ngOnInit() {
    this.isGSAAdmin = this.auth.isGSAAdmin;
  }

}

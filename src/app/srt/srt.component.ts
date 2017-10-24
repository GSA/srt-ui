import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth-guard.service';

@Component({
  selector: 'app-srt',
  templateUrl: './srt.component.html',
  styleUrls: ['./srt.component.css']
})
export class SrtComponent implements OnInit {

  /* ATTRIBUTES */

  isGSAAdmin = false;

  /* CONSTRUCTORS */

  /**
   * constructor
   * @param auth
   */
  constructor(
    private auth: AuthGuard
  ) { }

  /**
   * lifecycle
   */
  ngOnInit() {
    this.isGSAAdmin = this.auth.isGSAAdmin;
  }

}

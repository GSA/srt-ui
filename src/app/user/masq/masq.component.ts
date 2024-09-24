import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';


// import services
import {MasqService} from './masq.service';
import { AuthGuard } from '../../auth-guard.service';
import {TokenService} from '../../shared/services/token.service';



@Component({
  selector: 'masquerade',
  templateUrl: './masq.component.html',
  styleUrls: ['./masq.component.scss']
})
export class MasqComponent implements OnInit {

  masqForm: FormGroup;

  /* CONSTRUCTORS */
  /**
   * constructor
   */
  constructor(
    private masq: MasqService,
    private route: ActivatedRoute,
    private auth: AuthGuard,
    private fb: FormBuilder,
    private tokenService: TokenService
  ) {
  }

  /**
   * lifecycle
   */
  ngOnInit() {
    this.masqForm = this.fb.group({
      role: '',
      agency: ''
    });
    this.masqForm.valueChanges.subscribe(console.log);
  }


  onSubmit(form: FormGroup) {
    console.log (form.value.agency);
    this.masq.getMasqueradeToken(form.value.agency, form.value.role).subscribe(
      (data: any) => {
        this.tokenService.installToken(data.token);
        window.location.href = '/';
      }
    );

  }

}

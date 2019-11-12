import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-base',
  template: `
        <div>
            base works!!
        </div>
    `
})
export class BaseComponent implements OnInit {
  protected pageName = 'Solicitation Review Tool';
  protected tService: Title;

  constructor(
    titleService: Title
  ) {
    this.tService = titleService;
  }

  ngOnInit() {
    this.tService.setTitle(this.pageName);
  }
}

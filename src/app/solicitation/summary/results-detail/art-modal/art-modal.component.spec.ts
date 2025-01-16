import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtIframeDialogComponent } from './art-modal.component';
import { ArtService } from './art.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SolicitationService } from '../../../solicitation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';

import { ArtCategoryComponent } from './art-category/art-category.component';

describe('ArtIframeDialogComponent', () => {
  let component: ArtIframeDialogComponent;
  let fixture: ComponentFixture<ArtIframeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtIframeDialogComponent, ArtCategoryComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]),
            CommonModule, FormsModule, ButtonModule, DialogModule, 
            CheckboxModule],
      providers: [ArtService, SolicitationService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtIframeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear art_body on clearAll', () => {
    component.art_body = { someKey: 'someValue' };
    component.clearAll();
    expect(component.art_body).toEqual({});
  });

  it('should clear art_body on updateLanguage', () => {
    component.art_body = { someKey: 'someValue' };
    component.updateLanguage();
    expect(component.art_body).toEqual({});
  });
});

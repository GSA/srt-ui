import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtIframeDialogComponent } from './art-modal.component';

describe('ArtIframeDialogComponent', () => {
  let component: ArtIframeDialogComponent;
  let fixture: ComponentFixture<ArtIframeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtIframeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtIframeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtCategoryComponent } from './art-category.component';

describe('ArtCategoryComponent', () => {
  let component: ArtCategoryComponent;
  let fixture: ComponentFixture<ArtCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

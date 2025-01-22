import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtCategoryComponent } from './art-category.component';
// Import the module that declares p-checkbox
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

describe('ArtCategoryComponent', () => {
  let component: ArtCategoryComponent;
  let fixture: ComponentFixture<ArtCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtCategoryComponent ],
      imports: [ CheckboxModule, CommonModule, FormsModule ], // Add FormsModule to imports
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtCategoryComponent);
    component = fixture.componentInstance;
    component.category = { name: 'ICT Type', art_api: 'ict_type', type: 'array',
      subcategories: [
        { name: 'ICT Products', art_api: 'it-prod'},
        { name: 'ICT Services', art_api: 'it-serv'},
        { name: 'None of the above', art_api: 'it-none'}
    ]};

    component.selectedCategories = [];
    component.clearSelection = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPlaygroundComponent } from './ai-playground.component';

describe('AiPlaygroundComponent', () => {
  let component: AiPlaygroundComponent;
  let fixture: ComponentFixture<AiPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiPlaygroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

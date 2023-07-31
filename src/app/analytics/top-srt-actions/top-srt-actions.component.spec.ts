import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSrtActionsComponent } from './top-srt-actions.component';
import { TooltipModule } from 'primeng/tooltip';


describe('TopSrtActionsComponent', () => {
  let component: TopSrtActionsComponent;
  let fixture: ComponentFixture<TopSrtActionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSrtActionsComponent ],
      imports: [TooltipModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSrtActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

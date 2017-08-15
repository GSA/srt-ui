import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSrtActionsComponent } from './top-srt-actions.component';

describe('TopSrtActionsComponent', () => {
  let component: TopSrtActionsComponent;
  let fixture: ComponentFixture<TopSrtActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSrtActionsComponent ]
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

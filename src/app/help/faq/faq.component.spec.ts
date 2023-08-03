import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqComponent } from './faq.component';
import { HelpService } from '../../shared/services/help.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import * as $ from 'jquery';
import {By} from "@angular/platform-browser";

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;
  let helpService: HelpService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqComponent ],
      providers: [HelpService],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    helpService = TestBed.inject(HelpService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get FAQs', () => {
    const mockFAQs = [
      { id: 1, question: 'Question 1', answer: 'Answer 1' },
      { id: 2, question: 'Question 2', answer: 'Answer 2' }
    ];
    spyOn(helpService, 'getFAQs').and.returnValue(of(mockFAQs));
    component.getFAQs();
    expect(component.faq).toEqual(mockFAQs);
  });

  it('should scroll to element', () => {
    const mockElement = document.createElement('div');
    mockElement.id = 'test';
    spyOn(document, 'getElementById').and.returnValue(mockElement);
    spyOn($.fn, 'animate');
    component.scroll('test');
    expect(document.getElementById).toHaveBeenCalledWith('test');
    expect($.fn.animate).toHaveBeenCalledWith({
      scrollTop: $(mockElement).offset().top - 80
    });
  });

  it('should search for text', () => {

    const mockSearch = 'information';
    const searchInput = fixture.debugElement.nativeElement.querySelector('#search') as HTMLInputElement;
    const searchContents = fixture.debugElement.nativeElement.querySelectorAll('.search-content') as NodeListOf<HTMLElement>;
    const searchTitles = fixture.debugElement.nativeElement.querySelectorAll('.search-title') as NodeListOf<HTMLElement>;

    searchInput.value = mockSearch;
    searchInput.dispatchEvent(new Event('input'));

    component.search();
    expect(Array.from(searchContents).every((content) => content.style.display === 'block')).toBeTrue();
    expect(Array.from(searchTitles).every((title) => title.style.display === 'block')).toBeTrue();

  });

});



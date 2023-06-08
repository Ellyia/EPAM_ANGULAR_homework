import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarComponent } from './searchBar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchBarComponent', () => {
  let component = new SearchBarComponent();
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should log the search string when onSearch() is called', () => {
    spyOn(console, 'log');
    component.searchString = 'search';
    component.onSearch();
    expect(console.log).toHaveBeenCalledWith('search');
  });
});

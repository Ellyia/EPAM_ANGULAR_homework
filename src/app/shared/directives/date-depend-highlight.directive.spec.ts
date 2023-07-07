import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateDependHighlightDirective } from './date-depend-highlight.directive';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'app-highlight-test',
  template: `
    <div>
      <div appDateDependHighlight [creationDate]="'May 12 2024'"></div>
      <div appDateDependHighlight [creationDate]="'Jun 27 2023'"></div>
      <div appDateDependHighlight [creationDate]="'May 12 2023'"></div>
    </div>
  `
})
class DependHighlightTestComponent {
  constructor() {}
}

describe('DateDependHighlightDirective', () => {
  let fixture: ComponentFixture<DependHighlightTestComponent>;
  let component: DependHighlightTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateDependHighlightDirective, DependHighlightTestComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependHighlightTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should apply green border color -
      if the course date is 14 or less days ago/
      or blue - if course date is in the future`, () => {
    let items = fixture.debugElement.queryAll(
      By.directive(DateDependHighlightDirective)
    );

    const blue = items[0].nativeElement;
    const green = items[1].nativeElement;
    const none = items[2].nativeElement;

    expect(blue.style.border).toBe('2px solid deepskyblue');
    expect(green.style.border).toBe('2px solid darkseagreen');
    expect(none.style.border).toBe('');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IsAuthenticatedDirective } from './if-authenticated.directive';
import { Component, DebugElement } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-test',
  template: ` <div *appIsAuthenticated="value">content</div> `
})
class TestComponent {
  value: boolean = true;
  constructor() {}
}

describe('IsAuthenticatedDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsAuthenticatedDirective, TestComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show element, which contains "content"', () => {
    const el: DebugElement = fixture.debugElement.query(By.css('div'));
    expect(el.nativeElement.textContent).toContain('content');
  });

  it('shouldn`t show element', () => {
    fixture.componentInstance.value = false;
    fixture.detectChanges();

    const el: DebugElement = fixture.debugElement.query(By.css('div'));
    expect(el).toBeNull();
  });
});

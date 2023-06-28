import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAuthorsComponent } from './authorsInput.component';

describe('CourseAuthorsComponent', () => {
  let component: CourseAuthorsComponent;
  let fixture: ComponentFixture<CourseAuthorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseAuthorsComponent]
    });
    fixture = TestBed.createComponent(CourseAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

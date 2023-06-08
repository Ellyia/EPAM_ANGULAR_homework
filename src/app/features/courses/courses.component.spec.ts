import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { ICourse } from './models/course.model';
import { COURSES } from '../../assets/static/mock-courses';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CoursesComponent', () => {
  let component = new CoursesComponent();
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the courses', () => {
    expect(component.courses).toEqual(COURSES);
  });

  it('should log "Load more..." on clicking load more', () => {
    spyOn(console, 'log');
    const loadMoreButton =
      fixture.nativeElement.querySelector('.load-more-btn');
    loadMoreButton.click();
    // component.onClickLoadMore();
    expect(console.log).toHaveBeenCalledWith('Load more...');
  });

  it('should return the course id in identify method', () => {
    const index = 988;
    const course: ICourse = COURSES[0];
    const result = component.identify(index, course);
    expect(result).toBe(course.id);
  });

  it('should log the event when deleting a course', () => {
    spyOn(console, 'log');
    const courseId = 988;
    component.deleteCourse(courseId);
    expect(console.log).toHaveBeenCalledWith(courseId);
  });
});

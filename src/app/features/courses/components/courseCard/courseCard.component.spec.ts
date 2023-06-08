import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseCardComponent } from './courseCard.component';
import { SearchBarComponent } from '../searchBar/searchBar.component';
import { COURSES } from '../../../../assets/static/mock-courses';

describe('CourseCardComponent', () => {
  let component = new CourseCardComponent();
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseCardComponent, SearchBarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit deleteCourse event when onDelete is called', () => {
    const courseId = 988;
    spyOn(component.deleteCourse, 'emit');
    component.course = COURSES[0];
    component.onDelete();

    expect(component.deleteCourse.emit).toHaveBeenCalledWith(courseId);
  });
});

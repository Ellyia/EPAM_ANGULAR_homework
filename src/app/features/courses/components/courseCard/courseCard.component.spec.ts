import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseCardComponent } from './courseCard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormatDurationPipe } from '../../../../shared/pipes/duration.pipe';

const COURSES = [
  {
    id: 482,
    title: 'Kyiv',
    creationDate: 'Jun 15 2023',
    duration: 1541,
    description:
      'Anno Domini - AD. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam, reprehenderit dolore. Laudantium voluptatem quidem totam optio natus distinctio quaerat illum, iste eius vitae maxime velit, doloribus mollitia, enim officiis sit ...',
    topRated: true
  },
  {
    id: 2000,
    title: 'Lviv',
    creationDate: 'May 29 2023',
    duration: 4023,
    description: 'II ante Cristium - BC. In Domine Nomine Patres ...',
    topRated: false
  }
];

describe('CourseCardComponent', () => {
  let component: CourseCardComponent;
  let fixture: ComponentFixture<CourseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseCardComponent, FormatDurationPipe],
      schemas: [NO_ERRORS_SCHEMA]
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

  it('should emit deleteItem event when onDelete is called', () => {
    const courseId = 482;
    spyOn(component.deleteItem, 'emit');
    component.course = COURSES[0];
    component.onDelete();

    expect(component.deleteItem.emit).toHaveBeenCalledWith(courseId);
  });
});

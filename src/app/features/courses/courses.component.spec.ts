import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { ICourse } from './models/course.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FilterItemsPipe } from '../../shared/pipes/filterItems.pipe';
import { OrderByPipe } from '../../shared/pipes/orderBy.pipe';
import { CoursesService } from './services/courses.service';

const mockCourses: ICourse[] = [
  {
    id: 1,
    title: 'Alea jacta est.',
    creationDate: 'Jun 14 2023',
    duration: 1541,
    description: 'Anno Domini - AD. Amīcus Plato, sed magis amīca verĭtas.',
    topRated: true
  },
  {
    id: 2,
    title: 'Bibāmus!',
    creationDate: 'May 29 2024',
    duration: 767,
    description:
      'Ante Cristium - BC. In Domine Nomine Patres ... Aquĭla non captat muscas.',
    topRated: false
  },
  {
    id: 3,
    title: 'Aurea mediocrĭtas.',
    creationDate: 'May 29 2023',
    duration: 11,
    description: 'II ante Cristium - BC. Causa causārum.',
    topRated: false
  }
];

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let coursesService: Partial<CoursesService>;

  beforeEach(async () => {
    coursesService = {
      getList: jasmine
        .createSpy('getList')
        .and.returnValue([...mockCourses] as ICourse[]),
      removeItem: jasmine.createSpy('removeItem')
    };

    await TestBed.configureTestingModule({
      declarations: [CoursesComponent, FilterItemsPipe, OrderByPipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: CoursesService, useValue: coursesService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.debugElement.componentInstance;
    coursesService = TestBed.inject(CoursesService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should sort the courses array, fetch and display on initialization', () => {
    spyOn(component, 'filterCourses').and.callThrough();
    component.ngOnInit();

    expect(component.courses).toEqual(
      mockCourses.sort((a, b) => {
        const a1 = new Date(a.creationDate).getTime();
        const b1 = new Date(b.creationDate).getTime();
        return a1 - b1;
      })
    );
    expect(component.filterCourses).toHaveBeenCalled();
    expect(component.coursesToShow).toEqual(mockCourses);
    expect(component.isCourses).toBe(true);
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
    const index = 1;
    const course: ICourse = mockCourses[0];
    const result = component.identify(index, course);
    expect(result).toBe(course.id);
  });

  it('should return filtered array when filterCourses is called with a searchString', () => {
    component.courses = mockCourses;
    const search = 'Alea';
    const res = component.filterCourses('Alea');
    expect(res).toEqual(
      component.courses.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  it('should update coursesToShow when filterCourses is called without a searchString', () => {
    component.courses = mockCourses;
    const res = component.filterCourses('');
    expect(res).toEqual([...component.courses]);
  });

  // it('should show confirmation dialog and emit deleteItem event when onDelete is called and confirmed', () => {
  //   const courseId = 482;
  //   const deleteItemSpy = spyOn(component.deleteItem, 'emit');
  //   spyOn(window, 'confirm').and.returnValue(true);

  //   component.course = COURSES[0];
  //   component.onDelete();

  //   expect(window.confirm).toHaveBeenCalledWith(
  //     'Do you really want to delete this course?'
  //   );
  //   expect(deleteItemSpy).toHaveBeenCalledWith(courseId);
  // });

  // it('should not emit deleteItem event when onDelete is called and not confirmed', () => {
  //   const courseId = 482;
  //   const deleteItemSpy = spyOn(component.deleteItem, 'emit');
  //   spyOn(window, 'confirm').and.returnValue(false);

  //   component.course = COURSES[0];
  //   component.onDelete();

  //   expect(window.confirm).toHaveBeenCalledWith(
  //     'Do you really want to delete this course?'
  //   );
  //   expect(deleteItemSpy).not.toHaveBeenCalled();
  // });
});

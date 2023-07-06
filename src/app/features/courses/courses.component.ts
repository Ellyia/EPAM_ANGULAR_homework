import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ICourse } from './models/course.model';
import { FilterItemsPipe } from '../../shared/pipes/filterItems.pipe';
import { OrderByPipe } from '../../shared/pipes/order-by.pipe';
import { CoursesService } from './services/courses.service';
import { IBreadcrumb } from '../../core/models/breadcrumb.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  providers: [FilterItemsPipe, OrderByPipe]
})
export class CoursesComponent implements OnInit {
  courses: ICourse[] = [];
  isCourses: boolean = false;
  coursesToShow: ICourse[] = [];
  breadcrumbs: IBreadcrumb[] = [{ url: '/courses', label: 'Courses' }];

  searchStr: string = '';

  constructor(
    private filterItems: FilterItemsPipe,
    private orderBy: OrderByPipe,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showCourses();
  }

  showCourses(): void {
    this.coursesService.getList().subscribe((courses) => {
      this.courses = this.orderBy.transform(courses);
      this.coursesToShow = this.filterCourses(this.searchStr);
      this.isCourses = this.courses.length > 0;

      console.log(courses);
    });
  }

  onAddCourse(): void {
    this.router.navigate(['/courses/new']);
  }

  onClickLoadMore(): void {
    console.log('Load more...');
  }

  identify(index: number, course: ICourse): number {
    return course.id;
  }

  editCourse(id: number): void {
    this.router.navigate([`/courses/:${id}`]);
  }

  deleteCourse($event: number): void {
    let confirmOnDelete = confirm('Do you really want to delete this course?');
    if (confirmOnDelete) {
      this.coursesService.removeItem($event).subscribe(() => {
        this.showCourses();
      });
    }
  }

  searchCourses(searchString: string): void {
    this.searchStr = searchString;
    this.showCourses();
  }

  filterCourses(searchString: string): ICourse[] {
    return searchString
      ? this.filterItems.transform(this.courses, searchString)
      : [...this.courses];
  }
}

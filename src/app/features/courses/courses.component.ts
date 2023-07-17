import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ICourse } from './models/course.model';
import { CoursesService } from './services/courses.service';
import { IBreadcrumb } from '../../core/models/breadcrumb.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: ICourse[] = [];
  isCourses: boolean = false;
  isCoursesToShow: boolean = false;
  breadcrumbs: IBreadcrumb[] = [{ url: '/courses', label: 'Courses' }];
  subscription?: Subscription;

  searchStr: string = '';
  countToLoad = 3;
  startToLoad = 0;

  constructor(private coursesService: CoursesService, private router: Router) {}

  ngOnInit(): void {
    this.showCourses();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  showCourses(): void {
    this.subscription = this.coursesService
      .getList(this.startToLoad, this.countToLoad, this.searchStr)
      .subscribe((courses) => {
        this.isCoursesToShow = courses.length >= this.countToLoad;
        this.courses = [...this.courses, ...courses];

        this.isCourses = this.courses.length > 0;
      });
  }

  onAddCourse(): void {
    this.router.navigate(['/courses/new']);
  }

  onLoadMore(): void {
    this.startToLoad += this.countToLoad;
    this.showCourses();
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
        this.resetPaging();

        this.showCourses();
      });
    }
  }

  searchCourses(searchString: string): void {
    this.resetPaging();

    this.searchStr = searchString;
    this.showCourses();
  }

  resetPaging(): void {
    this.courses = [];
    this.startToLoad = 0;
  }
}

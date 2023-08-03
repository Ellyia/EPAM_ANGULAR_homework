import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ICourse } from './models/course.model';
import { CoursesService } from './services/courses.service';
import { IBreadcrumb } from '../../core/models/breadcrumb.model';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { GetCourses } from 'src/app/store/actions/courses.actions';
import { Observable } from 'rxjs';
import { selectCoursesList } from 'src/app/store/selectors/courses.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent extends BaseComponent implements OnInit {
  // courses: ICourse[] = [];
  courses$: Observable<ICourse[]> = this._store.select(selectCoursesList);

  isCourses: boolean = false;
  isCoursesToShow: boolean = false;
  breadcrumbs: IBreadcrumb[] = [{ url: '/courses', label: 'Courses' }];

  searchStr: string = '';
  countToLoad = 3;
  startToLoad = 0;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private _store: Store<IAppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.showCourses();
  }

  showCourses(): void {
    // this.subs = this.coursesService
    //   .getList(this.startToLoad, this.countToLoad, this.searchStr)
    //   .subscribe((courses) => {
    //     this.isCoursesToShow = courses.length >= this.countToLoad;
    //     this.courses = [...this.courses, ...courses];

    //     this.isCourses = this.courses.length > 0;
    //   });
    this._store.dispatch(
      GetCourses({
        start: this.startToLoad,
        count: this.countToLoad,
        textFragment: this.searchStr
      })
    );

    this.subs = this.courses$.subscribe((courses) => {
      this.isCoursesToShow = courses.length >= this.countToLoad;

      this.isCourses = courses.length > 0;
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
      this.subs = this.coursesService.removeItem($event).subscribe(() => {
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
    // this.courses = [];
    this.startToLoad = 0;
  }
}

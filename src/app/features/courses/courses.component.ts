import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ICourse } from './models/course.model';
import { IBreadcrumb } from '../../core/models/breadcrumb.model';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import {
  DeleteCourse,
  GetCourses,
  ResetCourses
} from 'src/app/store/actions/courses.actions';
import { Observable } from 'rxjs';
import {
  selectCoursesList,
  isCoursesToShow
} from 'src/app/store/selectors/courses.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent extends BaseComponent implements OnInit {
  courses$: Observable<ICourse[]> = this._store.select(selectCoursesList);
  isCoursesToShow$: Observable<boolean> = this._store.select(isCoursesToShow);

  isCourses: boolean = false;
  isCoursesToShow: boolean = false;
  breadcrumbs: IBreadcrumb[] = [{ url: '/courses', label: 'Courses' }];

  searchStr: string = '';
  countToLoad = 3;
  startToLoad = 0;

  constructor(private router: Router, private _store: Store<IAppState>) {
    super();
  }

  ngOnInit(): void {
    this.showCourses();
  }

  showCourses(): void {
    this._store.dispatch(
      GetCourses({
        start: this.startToLoad,
        count: this.countToLoad,
        textFragment: this.searchStr
      })
    );

    this.subs = this.courses$.subscribe((courses) => {
      this.isCoursesToShow$.subscribe((isCoursesToShow) => {
        this.isCoursesToShow = isCoursesToShow;
      });

      this.isCourses = courses.length > 0;
    });
  }

  onAddCourse(): void {
    this.startToLoad = 0;
    this.router.navigate(['/courses/new']);
  }

  onLoadMore(): void {
    this.startToLoad += this.countToLoad;
    this.showCourses();
  }

  identify(index: number, course: ICourse): number {
    return course.id;
  }

  deleteCourse(id: number): void {
    let confirmOnDelete = confirm('Do you really want to delete this course?');
    if (confirmOnDelete) {
      this._store.dispatch(DeleteCourse({ id }));

      this.startToLoad = 0;
    }
  }

  searchCourses(searchString: string): void {
    this.resetPaging();

    this.searchStr = searchString;
    this.showCourses();
  }

  resetPaging(): void {
    this._store.dispatch(ResetCourses());
    this.startToLoad = 0;
  }
}

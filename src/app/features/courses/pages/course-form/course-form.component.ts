import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ICourseForm } from '../../models/course-form.model';
import { CoursesService } from '../../services/courses.service';
import { IBreadcrumb } from 'src/app/core/models/breadcrumb.model';
import { EMPTY } from 'rxjs';
import { ICourse } from '../../models/course.model';
import { switchMap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { ResetCourses } from 'src/app/store/actions/courses.actions';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent extends BaseComponent implements OnDestroy {
  course: ICourseForm = {
    id: undefined,
    name: undefined,
    date: undefined,
    length: undefined,
    description: undefined,
    authors: undefined
  };

  breadcrumbs: IBreadcrumb[] = [{ url: '/courses', label: 'Courses' }];

  constructor(
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private _store: Store<IAppState>
  ) {
    super();
  }

  ngOnInit() {
    this.subs = this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          if (params.get('id')) {
            const id: number = +(params.get('id') as string);

            return this.coursesService.getItemById(id);
          } else {
            this.breadcrumbs.push({ label: 'Add course' });

            return EMPTY;
          }
        })
      )
      .subscribe((course: ICourse) => {
        this.course = course;
        this.breadcrumbs.push({ label: this.course.name as string });
      });
  }

  getDuration(duration: number): void {
    this.course.length = duration;
  }

  getDate(date: string): void {
    this.course.date = date;
  }

  getAuthors(authors: string): void {
    this.course.authors = authors;
  }

  save(): void {
    let courseOservable: any;

    this._store.dispatch(ResetCourses());

    if (this.course.id) {
      courseOservable = this.coursesService.updateItem(this.course);
    } else {
      courseOservable = this.coursesService.createCourse(this.course);
    }

    this.subs = courseOservable.subscribe((resp: ICourse) => {
      console.log(resp);
      this.router.navigate(['/courses']);
    });
  }

  cancel(): void {
    this._store.dispatch(ResetCourses());
    this.router.navigate(['/courses']);
  }
}

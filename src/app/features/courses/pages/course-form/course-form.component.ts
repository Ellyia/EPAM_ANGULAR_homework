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
import {
  AddCourse,
  EditCourse,
  ResetCourses
} from 'src/app/store/actions/courses.actions';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent extends BaseComponent implements OnDestroy {
  courseForm = new FormGroup({
    id: new FormControl<number | null>(null, Validators.required),
    name: new FormControl<string | null>(null, Validators.required),
    date: new FormControl<string | null>('', Validators.required),
    length: new FormControl<number | null>(null, Validators.required),
    description: new FormControl<string | null>(null, Validators.required),
    authors: new FormArray([
      new FormGroup({
        id: new FormControl<number | null>(null),
        name: new FormControl<string | null>(null),
        lastName: new FormControl<string | null>(null)
      })
    ])
  });

  breadcrumbs: IBreadcrumb[] = [{ url: '/courses', label: 'Courses' }];

  constructor(
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private store: Store<IAppState>
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

            this.store.dispatch(ResetCourses());

            return EMPTY;
          }
        })
      )
      .subscribe((course: ICourse) => {
        console.log(course);

        this.courseForm.patchValue(course);

        this.breadcrumbs.push({ label: this.courseForm.value.name as string });

        this.store.dispatch(ResetCourses());
      });
  }

  save(): void {
    console.log('courseForm:', this.courseForm?.value);

    const coursePayload = {
      id: this.courseForm.value.id,
      name: this.courseForm.value.name,
      date: this.courseForm.value.date,
      length: this.courseForm.value.length,
      description: this.courseForm.value.description,
      authors: this.courseForm.value.authors
    };
    console.log('coursePayload:', coursePayload);
    // if (coursePayload.id) {
    //   this.store.dispatch(EditCourse({ course: coursePayload }));
    // } else {
    //   this.store.dispatch(AddCourse({ course: coursePayload }));
    // }

    // this.reset();
  }

  cancel(): void {
    this.reset();
  }

  reset(): void {
    this.store.dispatch(ResetCourses());
    this.router.navigate(['/courses']);
  }
}

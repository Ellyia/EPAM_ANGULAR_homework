import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAuthor } from '../../models/author.model';
import { onlyNums } from 'src/app/shared/validators/numbers-only.validator';
import { dateValid } from 'src/app/shared/validators/date.validator';
import { arrayMinLengthValidator } from 'src/app/shared/validators/at-least-one-character.validator';
import { dateFormatBack } from 'src/app/shared/helpers/change-date-format-back.helper';
import { dateFormatUI } from 'src/app/shared/helpers/change-date-format-UI.helper';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  courseForm = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl<string | null>('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    date: new FormControl<string | null>('', [Validators.required, dateValid]),
    length: new FormControl<number | null>(null, [
      Validators.required,
      onlyNums
    ]),
    description: new FormControl<string | null>(null, [
      Validators.required,
      Validators.maxLength(500),
      Validators.minLength(2)
    ]),
    authors: new FormControl<IAuthor[]>([], [arrayMinLengthValidator(1)])
  });

  authorsList: IAuthor[] = [];

  breadcrumbs: IBreadcrumb[] = [{ url: '/courses', label: 'Courses' }];

  constructor(
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private store: Store<IAppState>
  ) {
    super();
  }

  requiredMsg = '* Required';
  maxLengthMsg = '* Max length:';
  minLengthMsg = '* Min length:';

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
        const dateForUI = dateFormatUI(course.date);

        this.courseForm.patchValue({
          id: course.id,
          name: course.name,
          length: course.length,
          description: course.description,
          date: dateForUI,
          authors: course.authors
        });

        this.breadcrumbs.push({ label: this.courseForm.value.name as string });

        this.store.dispatch(ResetCourses());
      });

    this.subs = this.activatedRoute.paramMap
      .pipe(
        switchMap(() => {
          return this.coursesService.getAuthors();
        })
      )
      .subscribe((authors: IAuthor[]) => {
        this.authorsList = authors;
      });
  }

  getAuthorsOFCourse(authors: any): void {
    this.courseForm.controls.authors.patchValue(authors);
  }

  save(): void {
    const dateForBack = dateFormatBack(this.courseForm.value.date || '');

    const coursePayload = {
      id: this.courseForm.value.id,
      name: this.courseForm.value.name,
      date: dateForBack,
      length: this.courseForm.value.length,
      description: this.courseForm.value.description,
      authors: this.courseForm.value.authors
    };

    if (coursePayload.id) {
      this.store.dispatch(EditCourse({ course: coursePayload }));
    } else {
      this.store.dispatch(AddCourse({ course: coursePayload }));
    }

    this.reset();
  }

  cancel(): void {
    this.reset();
  }

  reset(): void {
    this.store.dispatch(ResetCourses());
    this.router.navigate(['/courses']);
  }

  isCommonRequired(name: string) {
    return (
      this.courseForm.get(name)?.invalid &&
      (this.courseForm.get(name)?.dirty || this.courseForm.get(name)?.touched)
    );
  }
}

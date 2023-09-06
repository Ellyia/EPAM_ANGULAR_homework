import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ICourseForm } from '../../models/course-form.model';
import { CoursesService } from '../../services/courses.service';
import { IBreadcrumb } from 'src/app/core/models/breadcrumb.model';
import { EMPTY, of } from 'rxjs';
import { ICourse } from '../../models/course.model';
import { switchMap, tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import {
  AddCourse,
  EditCourse,
  ResetCourses
} from 'src/app/store/actions/courses.actions';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAuthor } from '../../models/author.model';
import { onlyNums } from 'src/app/shared/validators/numbers-only.validator';
import { dateValid } from 'src/app/shared/validators/date.validator';
import { arrayMinLengthValidator } from 'src/app/shared/validators/at-least-one-character.validator';

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
    authors: new FormArray([], [arrayMinLengthValidator])
  });

  authorsList: IAuthor[] = [];
  authorsOfCourse: any = [];

  breadcrumbs: IBreadcrumb[] = [{ url: '/courses', label: 'Courses' }];

  constructor(
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private store: Store<IAppState>
  ) {
    super();
  }

  requiredMsq = '* Required';

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
        const dateForUI = this.dateFormatUI(course.date);

        this.courseForm.patchValue({
          id: course.id,
          name: course.name,
          length: course.length,
          description: course.description,
          date: dateForUI
          // date: course.date // записую формат UI. Окремо? Як авторів?
        });

        this.setAuthors(course.authors);
        this.authorsOfCourse = course.authors;

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
    this.courseForm.value.authors = authors;
  }

  save(): void {
    const dateForBack = this.dateFormatBack(this.courseForm.value.date || '');

    const coursePayload = {
      id: this.courseForm.value.id,
      name: this.courseForm.value.name,
      date: dateForBack,
      // date: this.courseForm.value.date, // записую формат для беку
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

  setAuthors(authors: any[]): void {
    const authorsArray = this.courseForm.get('authors') as FormArray;
    authors.forEach((author) => {
      authorsArray.push(
        new FormGroup({
          id: new FormControl<number>(author.id),
          name: new FormControl<string>(author.name),
          lastName: new FormControl<string>(author.lastName)
        })
      );
    });
  }

  dateFormatUI(date: string): string {
    const dateUI = new Date(date || '');

    const d = dateUI.getDate();
    const dd = d < 10 ? '0' + d : d;

    const m = dateUI.getMonth() + 1;
    const mm = m < 10 ? '0' + m : m;

    const yyyy = dateUI.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
  }

  dateFormatBack(date: string): string {
    const dateParts = date?.split('/');
    if (dateParts?.length !== 3) return date;

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    const day = dateParts[0];
    const monthIndex = parseInt(dateParts[1]) - 1;
    const year = dateParts[2];

    if (monthIndex < 0 || monthIndex >= months.length) return date;

    return `${months[monthIndex]} ${day} ${year}`;
  }

  isCommonRequired(name: string) {
    return (
      this.courseForm.get(name)?.invalid &&
      (this.courseForm.get(name)?.dirty || this.courseForm.get(name)?.touched)
    );
  }
}

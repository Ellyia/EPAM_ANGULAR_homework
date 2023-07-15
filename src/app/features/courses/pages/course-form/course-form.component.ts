import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ICourseForm } from '../../models/course-form.model';
import { CoursesService } from '../../services/courses.service';
import { IBreadcrumb } from 'src/app/core/models/breadcrumb.model';
import { EMPTY, Subscription } from 'rxjs';
import { ICourse } from '../../models/course.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnDestroy {
  course: ICourseForm = {
    id: undefined,
    name: undefined,
    date: undefined,
    length: undefined,
    description: undefined,
    authors: undefined
  };

  breadcrumbs: IBreadcrumb[] = [{ url: '/courses', label: 'Courses' }];

  private subs: Subscription[] = [];

  constructor(
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnDestroy(): void {
    this.subs.forEach((subscr) => subscr.unsubscribe());
  }

  ngOnInit() {
    const sub = this.activatedRoute.paramMap
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

    this.subs.push(sub);
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
    if (this.course.id) {
      courseOservable = this.coursesService.updateItem(this.course);
    } else {
      courseOservable = this.coursesService.createCourse(this.course);
    }

    this.subs.push(
      courseOservable.subscribe((resp: ICourse) => {
        console.log(resp);
        this.router.navigate(['/courses']);
      })
    );
  }

  cancel(): void {
    this.router.navigate(['/courses']);
  }
}

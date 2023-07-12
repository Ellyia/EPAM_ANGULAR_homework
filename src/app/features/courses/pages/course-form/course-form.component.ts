import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ICourseForm } from '../../models/course-form.model';
import { CoursesService } from '../../services/courses.service';
import { IBreadcrumb } from 'src/app/core/models/breadcrumb.model';
import { Subscription } from 'rxjs';

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

  subscription1?: Subscription;
  subscription2?: Subscription;
  subscription3?: Subscription;

  constructor(
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnDestroy(): void {
    this.subscription1?.unsubscribe();
    this.subscription2?.unsubscribe();
    this.subscription3?.unsubscribe();
  }

  ngOnInit() {
    this.subscription1 = this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        const id: number = +(params.get('id') as string);

        this.subscription2 = this.coursesService
          .getItemById(id)
          .subscribe((course) => {
            this.course = course;
            this.breadcrumbs.push({ label: this.course.name as string });
          });
      } else {
        this.breadcrumbs.push({ label: 'Add course' });
      }
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
    if (this.course.id) {
      this.subscription3 = this.coursesService
        .updateItem(this.course)
        .subscribe((resp) => console.log(resp));
    } else {
      this.subscription3 = this.coursesService
        .createCourse(this.course)
        .subscribe((resp) => console.log(resp));
    }
    this.router.navigate(['/courses']);
  }

  cancel(): void {
    this.router.navigate(['/courses']);
  }
}

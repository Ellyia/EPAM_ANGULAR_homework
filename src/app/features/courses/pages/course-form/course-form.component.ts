import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourseForm } from '../../models/course-form.model';
import { CoursesService } from '../../services/courses.service';

import { Router } from '@angular/router';
import { IBreadcrumb } from 'src/app/core/models/breadcrumb.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
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
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (params.get('id')) {
        const id: number = +(params.get('id') as string);

        this.coursesService.getItemById(id).subscribe((course) => {
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
      this.coursesService.updateItem(this.course);
    } else {
      this.coursesService.createCourse(this.course);
    }
    this.router.navigate(['/courses']);
  }

  cancel(): void {
    this.router.navigate(['/courses']);
  }
}

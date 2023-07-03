import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourseForm } from '../../models/courseForm.model';
import { CoursesService } from '../../services/courses.service';

import { Router } from '@angular/router';
import { ICourse } from '../../models/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './courseForm.component.html',
  styleUrls: ['./courseForm.component.scss'],
  providers: [CoursesService]
})
export class CourseFormComponent {
  course: ICourseForm = {
    title: '',
    description: '',
    creationDate: ''
  };

  constructor(
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      if (params.get('id')) {
        const id: number = +(params.get('id') as string);

        this.course = this.coursesService.getItemById(id);
      }
    });
  }

  save(): void {
    this.router.navigate(['/courses']);
  }

  cancel(): void {
    this.router.navigate(['/courses']);
  }
}

import { Component } from '@angular/core';
import { ICourseForm } from '../../models/courseForm.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './courseForm.component.html',
  styleUrls: ['./courseForm.component.scss']
})
export class CourseFormComponent {
  COURSE: ICourseForm = {
    title: 'my title',
    description: 'my description',
    creationDate: 'Jun 27 2023',
    duration: 45
  };

  save(): void {}
  cancel(): void {}
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-course-form',
  templateUrl: './courseForm.component.html',
  styleUrls: ['./courseForm.component.scss']
})
export class CourseFormComponent {
  title = 'my title';
  description = 'my description';
  creationDate = 'Jun 27 2023';
  duration = 45;

  save(): void {}
  cancel(): void {}
}

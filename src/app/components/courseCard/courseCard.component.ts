import { Component, Input } from '@angular/core';
import { ICourse } from '../../models/course';

@Component({
  selector: 'app-course-card',
  templateUrl: './courseCard.component.html',
  styleUrls: ['./courseCard.component.css']
})
export class CourseCardComponent {
  title = 'card';

  @Input() course: ICourse;
}

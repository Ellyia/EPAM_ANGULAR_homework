import { Component, Input } from '@angular/core';
import { ICourse } from '../../models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  title = 'courses';

  desription = false;
  @Input() courses: ICourse[];
}

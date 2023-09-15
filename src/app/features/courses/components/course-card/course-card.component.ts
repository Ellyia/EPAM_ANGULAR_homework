import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { ICourse } from '../../models/course.model';

import { Router } from '@angular/router';
import { ICourseForm } from '../../models/course-form.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent {
  @Input()
  course!: ICourse;

  @Output() deleteItem = new EventEmitter<number>();

  constructor(private router: Router) {}

  onEdit(): void {
    this.router.navigate([`/courses/${this.course?.id}`]);
  }

  onDelete(): void {
    this.deleteItem.emit(this.course?.id);
  }
}

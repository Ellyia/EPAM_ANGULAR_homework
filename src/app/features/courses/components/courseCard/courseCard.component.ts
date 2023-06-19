import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICourse } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './courseCard.component.html',
  styleUrls: ['./courseCard.component.css']
})
export class CourseCardComponent {
  @Input() course?: ICourse;

  @Output() deleteItem = new EventEmitter<number>();

  onEdit(): void {}

  onDelete(): void {
    this.deleteItem.emit(this.course?.id);
  }
}

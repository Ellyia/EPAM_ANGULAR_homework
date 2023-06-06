import { Component, OnInit } from '@angular/core';
import { ICourse } from './models/course.model';
import { COURSES } from '../../assets/static/mock-courses';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: ICourse[] = [];

  ngOnInit(): void {
    this.courses = COURSES;
  }

  onClickLoadMore(): void {
    console.log('Load more...');
  }

  identify(index: number, course: ICourse): number {
    return course.id;
  }

  deleteCourse($event: number) {
    console.log($event);
  }
}

import { Component, OnInit } from '@angular/core';
import { ICourse } from './models/course.model';
import { COURSES } from '../../assets/static/mock-courses';
import { FilterItemsPipe } from '../../shared/pipes/filterItems.pipe';
import { OrderByPipe } from '../../shared/pipes/orderBy.pipe';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [FilterItemsPipe, OrderByPipe]
})
export class CoursesComponent implements OnInit {
  courses: ICourse[] = [];
  isCourses: boolean = false;
  coursesToShow: ICourse[] = [];

  constructor(
    private filterItems: FilterItemsPipe,
    private orderBy: OrderByPipe
  ) {}

  ngOnInit(): void {
    this.courses = this.orderBy.transform(COURSES);
    this.coursesToShow = [...this.courses];
    console.log(this.courses.length > 0);
    this.isCourses = this.courses.length > 0;
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

  filterCourses(searchString: string) {
    this.coursesToShow = searchString
      ? this.filterItems.transform(this.courses, searchString)
      : [...this.courses];
  }
}

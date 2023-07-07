import { ICourse } from '../models/course.model';
import { Injectable } from '@angular/core';
import { ICourseForm } from '../models/course-form.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private COURSES: ICourse[] = [
    {
      id: 1,
      title: 'Alea jacta est.',
      creationDate: 'Jun 14 2023',
      duration: 1541,
      description: 'Anno Domini - AD. Amīcus Plato, sed magis amīca verĭtas.',
      topRated: true
    },
    {
      id: 2,
      title: 'Bibāmus!',
      creationDate: 'May 29 2024',
      duration: 767,
      description:
        'Ante Cristium - BC. In Domine Nomine Patres ... Aquĭla non captat muscas.',
      topRated: false
    },
    {
      id: 3,
      title: 'Aurea mediocrĭtas.',
      creationDate: 'May 29 2023',
      duration: 11,
      description: 'II ante Cristium - BC. Causa causārum.',
      topRated: false
    }
  ];

  getList(): ICourse[] {
    return this.COURSES;
  }

  createCourse(item: ICourseForm): void {
    this.COURSES.push(item as ICourse);
  }

  getItemById(id: number): ICourseForm {
    const course = this.COURSES.find((item) => item.id === id) as ICourseForm;
    return course;
  }

  updateItem(item: ICourseForm): void {
    const id = item.id as number;
    const index = this.COURSES.findIndex((el) => el.id === id);
    this.COURSES.splice(index, 1, item as ICourse);
  }

  removeItem(id: number): void {
    this.COURSES = [...this.COURSES].filter((el) => el.id !== id);
  }
}

import { ICourse } from '../models/course.model';
import { Injectable } from '@angular/core';
import { ICourseForm } from '../models/courseForm.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  private COURSES: ICourse[] = [
    {
      id: 1,
      name: 'Alea jacta est.',
      date: 'Jun 14 2023',
      length: 1541,
      description: 'Anno Domini - AD. Amīcus Plato, sed magis amīca verĭtas.',
      isTopRated: true,
      authors: 'Socrat'
    },
    {
      id: 2,
      name: 'Bibāmus!',
      date: 'May 29 2024',
      length: 767,
      description:
        'Ante Cristium - BC. In Domine Nomine Patres ... Aquĭla non captat muscas.',
      isTopRated: false,
      authors: ''
    },
    {
      id: 3,
      name: 'Aurea mediocrĭtas.',
      date: 'May 29 2023',
      length: 11,
      description: 'II ante Cristium - BC. Causa causārum.',
      isTopRated: false,
      authors: ''
    }
  ];

  getList(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(
      'http://localhost:3004/courses?start=0&count=3'
    );
  }

  createCourse(item: ICourseForm): void {
    this.COURSES.push(item as ICourse);
  }

  getItemById(id: number): Observable<ICourseForm> {
    return this.http.get<ICourseForm>(`http://localhost:3004/courses/${id}`);
    // const course = this.COURSES.find((item) => item.id === id) as ICourseForm;
    // return course;
  }

  updateItem(item: ICourseForm): void {
    const id = item.id as number;

    const index = this.COURSES.findIndex((el) => el.id === id);
    this.COURSES.splice(index, 1, item as ICourse);
  }

  removeItem(id: number): Observable<ICourse[]> {
    return this.http.delete<ICourse[]>(`http://localhost:3004/courses/${id}`);
    // this.COURSES = [...this.COURSES].filter((el) => el.id !== id);
  }
}

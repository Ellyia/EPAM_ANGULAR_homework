import { ICourse } from '../models/course.model';

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

  createCourse() {}

  getItemById() {}

  updateItem() {}

  removeItem($event: number): void {
    this.COURSES = [...this.COURSES].filter((el) => el.id !== $event);
    console.log('removed', $event, this.COURSES);
  }
}

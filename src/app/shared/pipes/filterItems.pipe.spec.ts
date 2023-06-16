import { FilterItemsPipe } from './filterItems.pipe';
import { ICourse } from 'src/app/features/courses/models/course.model';
import { COURSES } from 'src/app/assets/static/mock-courses';

describe('FilterItemsPipe', () => {
  let pipe: FilterItemsPipe;

  beforeEach(() => {
    pipe = new FilterItemsPipe();
  });

  const COURSES = [
    {
      id: 482,
      title: 'Kyiv',
      creationDate: 'Jun 15 2023',
      duration: 1541,
      description:
        'Anno Domini - AD. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam, reprehenderit dolore. Laudantium voluptatem quidem totam optio natus distinctio quaerat illum, iste eius vitae maxime velit, doloribus mollitia, enim officiis sit ...',
      topRated: true
    },
    {
      id: 2000,
      title: 'Lviv',
      creationDate: 'May 29 2023',
      duration: 4023,
      description: 'II ante Cristium - BC. In Domine Nomine Patres ...',
      topRated: false
    }
  ];

  it('should filter array by searchString', () => {
    const coursesToFilter = [...COURSES];
    const searchString = 'lv';
    const filtered = pipe.transform(coursesToFilter, searchString);

    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toBe(COURSES[1].title);
  });

  it('should return all items in array, if searchString is empty ', () => {
    const coursesToFilter = [...COURSES];
    const searchString = '';
    const filtered = pipe.transform(coursesToFilter, searchString);

    expect(filtered).toEqual(COURSES);
    expect(filtered.length).toBe(2);
  });

  it('should return an empty array, if searchString has no matches with items', () => {
    const coursesToFilter = [...COURSES];
    const searchString = 'no matches';
    const filtered = pipe.transform(coursesToFilter, searchString);

    expect(filtered.length).toBe(0);
  });
});

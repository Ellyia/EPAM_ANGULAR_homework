import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let coursesService: CoursesService;

  beforeEach(() => {
    coursesService = new CoursesService();
  });

  it('should return the list of courses', () => {
    const courses = coursesService.getList();
    expect(courses.length).toBe(3);
  });

  it('should remove an item from the list', () => {
    const courseIdToRemove = 2;
    coursesService.removeItem(courseIdToRemove);
    const courses = coursesService.getList();
    expect(courses.length).toBe(2);
    expect(courses.find((course) => course.id === courseIdToRemove)).toBe(
      undefined
    );
  });
});

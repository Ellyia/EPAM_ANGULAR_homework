import { OrderByPipe } from './order-by.pipe';
import { ICourse } from 'src/app/features/courses/models/course.model';
import { COURSES } from 'src/app/assets/static/mock-courses';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('should sort array by creationDate field', () => {
    const coursesToSort = [...COURSES];
    const sorted = pipe.transform(coursesToSort);
    expect(sorted[0].creationDate).toBe('Jun 14 2023');
    expect(sorted[1].creationDate).toBe('May 29 2024');
  });

  it('should return a new array instance', () => {
    const items: ICourse[] = [...COURSES];
    const sortedItems = pipe.transform(items);

    expect(sortedItems).not.toBe(items);
  });
});

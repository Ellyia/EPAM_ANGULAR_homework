import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from 'src/app/features/courses/models/course.model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(items: ICourse[]): ICourse[] {
    const sortedItems = [...items];

    return sortedItems.sort((a, b) => {
      let a1 = new Date(a.creationDate).getTime();
      let b1 = new Date(b.creationDate).getTime();
      return a1 - b1;
    });
  }
}

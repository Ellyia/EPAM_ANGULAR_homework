import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from 'src/app/features/courses/models/course.model';

@Pipe({
  name: 'filterItems'
})
export class FilterItemsPipe implements PipeTransform {
  transform(items: ICourse[], search: string): ICourse[] {
    return items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }
}

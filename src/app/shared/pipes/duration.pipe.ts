import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {
  transform(duration?: number, emptyValue = ''): string {
    if (duration) {
      if (duration < 60) {
        return `${duration < 10 ? '0' + duration : duration}min`;
      } else {
        const hours = Math.trunc(duration / 60);
        const mins = duration % 60;

        return `${hours < 10 ? '0' + hours : hours}h ${
          mins < 10 ? '0' + mins : mins
        }min`;
      }
    } else {
      return emptyValue;
    }
  }
}

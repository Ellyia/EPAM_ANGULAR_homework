import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent {
  @Input() date?: string;

  @Output() dateEvent = new EventEmitter<string>();

  dateChanged(value: string) {
    this.dateEvent.emit(value);
  }
}
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './dateInput.component.html',
  styleUrls: ['./dateInput.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent {
  @Input() creationDate?: string;

  @Output() dateEvent = new EventEmitter<string>();

  dateChanged(value: string) {
    this.dateEvent.emit(value);
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DurationInputComponent {
  @Input() length?: number;
  @Output() durationEvent = new EventEmitter<number>();

  dataChanged(value: number) {
    this.durationEvent.emit(value);
  }
}

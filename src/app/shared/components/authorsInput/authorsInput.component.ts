import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-authors-input',
  templateUrl: './authorsInput.component.html',
  styleUrls: ['./authorsInput.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsInputComponent {
  @Input() authors?: [];

  @Output() authorsEvent = new EventEmitter<string>();

  dateChanged(value: string) {
    this.authorsEvent.emit(value);
  }
}

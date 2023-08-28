import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsInputComponent {
  @Input() authors?: [];
  @Input() author?: {
    id: number | null;
    name: string | null;
    lastName: string | null;
  };

  // @Output() authorsEvent = new EventEmitter<string>();

  @Input() i?: any;
  // dateChanged(value: string) {
  //   this.authorsEvent.emit(value);
  // }
}

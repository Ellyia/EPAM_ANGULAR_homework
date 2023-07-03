import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-duration-input',
  templateUrl: './durationInput.component.html',
  styleUrls: ['./durationInput.component.scss']
})
export class DurationInputComponent {
  @Input() duration?: number;
}

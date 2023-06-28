import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './dateInput.component.html',
  styleUrls: ['./dateInput.component.scss']
})
export class DateInputComponent {
  @Input() creationDate?: string;
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DurationInputComponent),
  multi: true
};

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DurationInputComponent implements ControlValueAccessor {
  value: number | null = null;

  onChange = (value: any) => {};
  onTouched = () => {};

  onInputChange(e: any): void {
    this.value = e.target.value; // changes in form
    this.onChange(this.value);
  }

  writeValue(value: any) {
    console.log('duration', value);
    this.value = value || null;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  markAsTouched(): void {
    this.onTouched();
  }
}

import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/components/base/base.component';

const CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchBarComponent),
  multi: true
};

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  providers: [CONTROL_VALUE_ACCESSOR]
})
export class SearchBarComponent
  extends BaseComponent
  implements OnInit, ControlValueAccessor
{
  // @Output() searchItems = new EventEmitter<string>();

  // subject = new Subject<string>();

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor() {
    super();
  }

  value: string = '';

  onInputChange(e: any): void {
    this.value = e.target.value;
    this.onChange(this.value);

    // this.cdr.detectChanges();
  }

  writeValue(value: any) {
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

  onSearch(event: any): void {
    this.subject.next(event.target.value);
  }

  ngOnInit(): void {
    this.subs = this.subject
      .pipe(
        debounceTime(500),
        filter(
          (searchStr: string) => searchStr.length >= 3 || searchStr.length === 0
        )
      )
      .subscribe((searchStr: string) => {
        this.searchItems.emit(searchStr);
      });
  }
}

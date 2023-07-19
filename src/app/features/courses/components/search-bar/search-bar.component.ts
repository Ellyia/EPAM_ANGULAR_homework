import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { interval, Subject } from 'rxjs';
import { filter, debounceTime, debounce } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  @Output() searchItems = new EventEmitter<string>();

  subject = new Subject<string>();

  onSearch(event: any): void {
    this.subject.next(event.target.value);
  }

  ngOnInit(): void {
    this.subject
      .pipe(
        // debounceTime(1000),
        debounce(() => interval(500)),
        filter(
          (searchStr: string) => searchStr.length >= 3 || searchStr.length === 0
        )
      )
      .subscribe((searchStr: string) => {
        this.searchItems.emit(searchStr);
      });
  }

  ngOnChanges(): void {
    console.log('ngOnChanges');
  }

  ngDoCheck(): void {
    console.log('ngDoCheck');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }
}

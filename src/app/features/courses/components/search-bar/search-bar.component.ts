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
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, debounceTime } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/components/base/base.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent
  extends BaseComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Output() searchItems = new EventEmitter<string>();

  subject = new Subject<string>();

  constructor() {
    super();
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

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { BaseComponent } from 'src/app/core/components/base/base.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent extends BaseComponent implements OnInit {
  @Output() searchItems = new EventEmitter<string>();

  constructor() {
    super();
  }
  searcher = new FormGroup({
    searchStr: new FormControl<string>('', { nonNullable: true })
  });

  ngOnInit(): void {
    this.subs = this.searcher.controls.searchStr.valueChanges
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

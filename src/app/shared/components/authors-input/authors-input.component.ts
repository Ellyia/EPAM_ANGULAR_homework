import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { IAuthor } from 'src/app/features/courses/models/author.model';

const AUTHORS_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AuthorsInputComponent),
  multi: true
};
@Component({
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.scss'],
  providers: [
    AUTHORS_INPUT_CONTROL_VALUE_ACCESSOR,
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AuthorsInputComponent),
      multi: true
    }
  ]
})
export class AuthorsInputComponent
  extends BaseComponent
  implements OnInit, ControlValueAccessor
{
  @Input() authorsList: IAuthor[] = [];
  @Output() authorsEvent = new EventEmitter<any>();

  value: IAuthor[] = [];

  onChange = (value: any) => {};

  filteredAuthors: IAuthor[] = [];
  selectedAuthor: string = '';

  authorForm: FormGroup = new FormGroup({
    author: new FormControl(null)
  });

  searchControl: any;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.authorsEvent.emit(this.value);

    this.cdr.detectChanges();
  }

  registerOnTouched(fn: any): void {}

  ngOnInit() {
    this.searchControl = this.formBuilder.control('');
    this.authorForm = this.formBuilder.group({
      searchControl: this.searchControl
    });

    this.subs = this.searchControl.valueChanges.subscribe((value: string) => {
      this.filteredAuthors = this.authorsList.filter((author) =>
        author.name.toLowerCase().includes(value.toLowerCase())
      );
    });
  }

  selectAuthor(author: any) {
    this.searchControl.setValue(author.name);

    const nameParts = author.name.split(' ');
    // if (nameParts?.length !== 2) {
    //   this.value.push(author);
    // } else {
    const authorToCourse: IAuthor = {
      id: author.id,
      name: nameParts[0],
      lastName: nameParts[1]
    };
    this.value.push(authorToCourse);
    this.authorsEvent.emit(this.value);
    // }

    // this.authorsEvent.emit(this.value);

    this.searchControl.setValue('');
    this.filteredAuthors = [];
  }

  deleteAuthor(id: number) {
    this.value = this.value.filter((author) => author.id !== id);
    this.authorsEvent.emit(this.value);
  }
}

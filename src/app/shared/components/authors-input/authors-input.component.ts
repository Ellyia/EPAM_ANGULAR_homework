import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { IAuthor } from 'src/app/features/courses/models/author.model';

@Component({
  selector: 'app-authors-input',
  templateUrl: './authors-input.component.html',
  styleUrls: ['./authors-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorsInputComponent extends BaseComponent implements OnInit {
  @Input() authorsList: IAuthor[] = [];
  @Input() authorsOfCourse: IAuthor[] = [];

  @Output() authorsEvent = new EventEmitter<any>();

  filteredAuthors: IAuthor[] = [];
  selectedAuthor: string = '';

  authorForm: FormGroup = new FormGroup({
    author: new FormControl(null)
  });

  searchControl: any;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

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

    this.authorsOfCourse.push(author);

    this.sendAuthors();

    this.searchControl.setValue('');
    this.filteredAuthors = [];
  }

  deleteAuthor(id: number) {
    this.authorsOfCourse = this.authorsOfCourse.filter(
      (author) => author.id !== id
    );

    this.sendAuthors();
  }

  sendAuthors() {
    this.authorsEvent.emit(this.authorsOfCourse);
  }
}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IAuthor } from 'src/app/features/courses/models/author.model';

export function arrayMinLengthValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as IAuthor[];

    return !!value && Array.isArray(value) && value.length >= minLength
      ? null
      : { arrayMinLengthValidator: { value: '* should be at least 1 author' } };
  };
}

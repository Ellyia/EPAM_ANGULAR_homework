import { AbstractControl, ValidationErrors } from '@angular/forms';

export function arrayMinLengthValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  return !!value || Array.isArray(value) || value.length === 0
    ? null
    : { arrayMinLengthValidator: { value: 'need at least 1 author' } };
}

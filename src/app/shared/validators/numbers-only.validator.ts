import { AbstractControl, ValidationErrors } from '@angular/forms';

export function onlyNums(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  const hasOnlyNumeric = /^[0-9]+/.test(value);

  return hasOnlyNumeric ? null : { onlyNums: { value: 'only numbers' } };
}

import { AbstractControl, ValidationErrors } from '@angular/forms';

export function onlyNums(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (value) {
    const hasOnlyNumeric = /^[0-9]+/.test(value);
    if (hasOnlyNumeric) {
      const hasntFirstZero = /^[1-9]\d*$/.test(value);
      return hasntFirstZero
        ? null
        : { onlyNums: { value: "* shouldn't start from 0" } };
    } else {
      return hasOnlyNumeric
        ? null
        : { onlyNums: { value: '* only numbers are allowed' } };
    }
  }

  return null;
}

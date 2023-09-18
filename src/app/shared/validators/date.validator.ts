import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateValid(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (value) {
    const isVaidDate =
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(value);

    return isVaidDate
      ? null
      : { dateValid: { value: '* Only dd/mm/yyyy format valid' } };
  }

  return null;
}

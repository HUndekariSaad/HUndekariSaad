import { Validators } from "@angular/forms";


export const DEBOUNCETIME = 400;
export const DEFAULT_PAGE_NUMBER = 1;
export const PAGESIZE = 5;
export const VatAmount= 5;
export const DATE_FORMAT = 'DD-MMM-YYYY';



export const FIELD_VALIDATIONS = {
  NUMERIC_ONLY: Validators.pattern((/^[0-9]*$/)),
  ALPHABETS_ONLY: Validators.pattern((/^[a-zA-Z ]*$/)),
  ALPHANUMERIC_ONLY: Validators.pattern((/^([a-zA-Z0-9 ]+)$/)),
  EMAIL_ONLY: Validators.pattern(('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'))
};

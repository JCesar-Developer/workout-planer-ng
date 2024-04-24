// import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

export interface ErrorMap {
  form: FormGroup,
  field: string,
  errorMessageMap: ErrorMessageMap,
}

export interface ErrorMessageMap {
  [key: string]: ((errors?: ValidationErrors) => string);
}

// @Injectable({providedIn: 'root'})
export class InputErrorMessageService {

  constructor(
    private form: FormGroup,
    private errorMessageMap: ErrorMessageMap,
  ) {}

  public isInvalidField( field: string ) {
    return this.form.controls[field].errors && this.form.controls[field].touched;
  }

  public getErrorMessage( field: string ): string|null {
    if( !this.form.controls[field] ) return null;

    const errors = this.form.controls[field]?.errors || undefined;

    if (!errors) return null;

    for( const key of Object.keys(errors) ) {
      return this.errorMessageMap[key] ? this.errorMessageMap[key](errors) : null;
    }

    return null;
  }

}

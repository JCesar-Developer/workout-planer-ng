import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

export interface ErrorMessageMap {
  [key: string]: ((errors?: ValidationErrors) => string);
}

export interface ErrorMap {
  form: FormGroup,
  field: string,
  errorMessageMap: ErrorMessageMap,
}

@Injectable({providedIn: 'root'})
export class InputErrorMessageService {

  public isInvalidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getErrorMessage( {form, field, errorMessageMap: errorMap}: ErrorMap ): string|null {
    if( !form.controls[field] ) return null;

    const errors = form.controls[field]?.errors || null;

    if (!errors) return null;

    for( const key of Object.keys(errors) ) {
      return errorMap[key] ? errorMap[key](errors) : null;
    }

    return null;
  }

}

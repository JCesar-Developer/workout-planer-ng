import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class CustomValidatorsService {

  public noWhitespace(control: AbstractControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

}

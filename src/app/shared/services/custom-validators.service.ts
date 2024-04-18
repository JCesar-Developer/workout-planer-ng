import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class CustomValidatorsService {

  public noWhitespace(control: AbstractControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  public atLeastTwoExercises(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const exercises = (control.get('categorizedExercises') as FormArray).controls;
      if (!exercises || exercises.length < 2) {
        return { atLeastTwoExercises: true };
      }
      return null;
    };
  }

}

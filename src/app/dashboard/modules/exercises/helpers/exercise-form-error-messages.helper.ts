import { ErrorMessageMap } from "@/shared/helpers/form-validator.helper";
import { ValidationErrors } from "@angular/forms";

export const exerciseErrorMessages: ErrorMessageMap = {
  'required': () => 'Este campo es requerido',
  'minlength': (errors?: ValidationErrors) => `Este campo debe tener al menos ${errors ? errors['minlength'].requiredLength : 0} caracteres`,
  'whitespace': () => 'Este campo no puede contener solo espacios en blanco',
};

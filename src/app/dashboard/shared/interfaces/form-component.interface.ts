import { FormGroup } from '@angular/forms';

export interface FormComponent<T> {
  form: FormGroup;
  save(model: T): void;
  update(model: T): void;
  delete(modelId: string | number): void;
}

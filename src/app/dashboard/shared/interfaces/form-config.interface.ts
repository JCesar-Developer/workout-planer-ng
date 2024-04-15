import { DynamicDialogConfig } from "primeng/dynamicdialog";

export interface FormConfig<T = any> {
  model?: T;
  formConfig: DynamicDialogConfig;
}

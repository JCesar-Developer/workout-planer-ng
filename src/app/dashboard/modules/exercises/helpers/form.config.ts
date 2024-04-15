import { DynamicDialogConfig } from "primeng/dynamicdialog";

export const exerciseFormConfig: DynamicDialogConfig = {
  data: { model },
  header: ( title ) ? title : 'Formulario',
  width: '50vw',
  height: '50vh',
  dismissableMask: true,
}

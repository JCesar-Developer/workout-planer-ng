import { ToastMessage } from "@/dashboard/shared/interfaces/form-messages.interface";

export const exerciseToastMessages: ToastMessage = {
  success: {
    create: (exerciseName: string) => `Ejercicio "${exerciseName}" creado con éxito`,
    update: (exerciseName: string) => `Ejercicio "${exerciseName}" actualizado con éxito`,
    delete: (exerciseName: string) => `Ejercicio "${exerciseName}" eliminado con éxito`
  },
  error: {
    create: 'Error al crear el ejercicio, por favor, revise su conexión a internet y vuelva a intentarlo',
    update: 'Error al actualizar el ejercicio, por favor, revise su conexión a internet y vuelva a intentarlo',
    delete: 'Error al eliminar el ejercicio, por favor, revise su conexión a internet y vuelva a intentarlo'
  }
};

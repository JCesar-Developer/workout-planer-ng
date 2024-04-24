import { ToastMessage } from "@/dashboard/shared/interfaces/form-messages.interface";

export const workoutToastMessages: ToastMessage = {
  success: {
    create: (workoutName: string) => `Rutina "${workoutName}" creada con éxito`,
    update: (workoutName: string) => `Rutina "${workoutName}" actualizada con éxito`,
    delete: (workoutName: string) => `Rutina "${workoutName}" eliminada con éxito`
  },
  error: {
    create: 'Error al crear la rutina, por favor, revise su conexión a internet y vuelva a intentarlo',
    update: 'Error al actualizar la rutina, por favor, revise su conexión a internet y vuelva a intentarlo',
    delete: 'Error al eliminar la rutina, por favor, revise su conexión a internet y vuelva a intentarlo'
  }
};

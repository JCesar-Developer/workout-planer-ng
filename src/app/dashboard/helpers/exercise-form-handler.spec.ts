import { Category } from '@dashboard/shared/interfaces/exercise.interface';
import { FormHandler } from './exercise-form-handler.helper';
import { of } from 'rxjs';

describe('ExerciseFormHandler', () => {

  const exerciseMock = { id: '1', name: 'Exercise 1', category: Category.CHEST, image: './assets/images/exercises/exercise-1.gif' };

  let handler: FormHandler;
  let dialogServiceMock: any;
  let messageServiceMock: any;

  beforeEach(() => {
    dialogServiceMock = jasmine.createSpyObj('DialogService', ['open']);
    dialogServiceMock.open.and.returnValue({
      onClose: of({ status: 'success', message: 'Test message' })
    });

    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);
    handler = new FormHandler(dialogServiceMock, messageServiceMock);
  });

  //Verificar que la clase se puede instanciar correctamente.
  it('should create', () => {
    expect(handler).toBeTruthy();
  });

  //Verificar que el método openForm() abre el formulario sin datos del ejercicio.
  it('should open form without exercise data', () => {
    handler.openForm();
    expect(dialogServiceMock.open).toHaveBeenCalledWith(
      jasmine.any(Function),
      jasmine.objectContaining({
        data: { exercise: undefined },
        header: 'Crear Ejercicio',
        width: '50vw',
        height: '50vh',
        dismissableMask: true,
      })
    );
  });

  //Verificar que el método openForm() abre el formulario con los datos del ejercicio.
  it('should open form with exercise data', () => {
    handler.openForm(exerciseMock);
    expect(dialogServiceMock.open).toHaveBeenCalledWith(
      jasmine.any(Function),
      jasmine.objectContaining({
        data: { exercise: exerciseMock },
        header: 'Editar Ejercicio',
        width: '50vw',
        height: '50vh',
        dismissableMask: true,
      }
    ));
  });

  // Verificar que tras abrir el fomulario, se suscribe correctamente al evento onClose.
  it('should subscribe to onClose event', () => {
    handler.openForm();
    expect(messageServiceMock.add).toHaveBeenCalledWith('Test message');
  });

  // Verificar que el método showAlert llama al método add del messageService con el mensaje correcto.
  it('should show alert with correct message', () => {
    const messageMock = { severity: 'success', summary: 'Test Summary', detail: 'Test Detail' };
    handler['showAlert'](messageMock);
    expect(messageServiceMock.add).toHaveBeenCalledWith(messageMock);
  });
});

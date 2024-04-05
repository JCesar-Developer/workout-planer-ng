# Workout Planner App

## Dev

1. Clonar el proyecto.
2. Ejecutar ```npm install```
3. Levantar backend ```npm run backend```
4. Ejecutar la app ```npm start``` o bien ```ng serve -o```

# TODO-LIST

✅❌👉❗

[] Animación para hacer más suave la transición entre páginas.

### EXERCISES MODULE
[✅] Aislar PAGE HEADER en su propio módulo.
[✅] Aislar PAGE LIST en su propio módulo.
[] Agregar Linter & Prettier 
[] Explorar cargas diferidas en Angular.
[] Explorar FORMGROUPS, FORMCONTROLS, FORMBUILDERS.
[] Explorar COMPOSABLE ARCHITECTURE en Angular.
[] Proveer MessageService a nivel de Páginas.

##### PAGE HEADER
[✅] Add ➡️ search-bar.
[✅] Add ➡️ Button add new exercise.
[✅] Create ➡️ Tags to select different exercises.
[] Agregar validación al Autocomplete.

##### PAGE LIST
[] Agregar paginación al formulario. 

##### EXERCISE CARD
[✅] Improve ➡️ the exercise-card presentation.
[✅] Arreglar el tamaño de las tarjetas cuando el título es demasiado grande.
  [✅] Tamaño fijo para texto.
  [✅] Tamaño fijo para Categoría.


##### FORM MODEL
[✅] Create ➡️ Model to add new exercise.
[✅] Validaciones. (No aceptar si está sin nombre).
[❌] Agregar debouncer al URL alternativo.
[✅] La imagen del formulario es más grande de lo normal.
[] Almacenar imágenes en entorno local.
[] Asegurarse que el NAME-INPUT, no acepta strings vacios.

  OK 
  [✅] Mostrar snackbar tras la insersión del ejercicio. 
  [✅] Cerrar el modelo cuando se hace el guardado.
  [✅] Refrescar el listado para mostrar nuevo ejercicio el primero. 
  
  NO:
  [] Colorear la ADVERTENCIA que muestra el error de validación del formulario. ❗❗❗
  [✅] Manejo del error.
  [✅] Mostrar snackbar que muestre error.

  CANCEL:
  [✅] limpiar el formulario después de cancelar el pop-up.
  [✅] Cerrar el formulario.

  UPDATE:
  [✅] Extraer los datos del ejercicio.
  [✅] Cambiar el título del formulario, dependiendo de la acción.
  [✅] Cambiar LABEL del botón SUBMIT, dependiendo de la acción.
  [✅] Actualizar ejercicio.

  DELETE: 
  [✅] Agregar opción para eliminar el Ejercicio. 
  [✅] Eliminar ejercicio, y actualizar la interfas. 
  [✅] Notificar que el ejercicio se eliminó correctamente 

###### TEST:
[] Estudiar Karma + Jasmine.
[] Crear test unitarios y E2E tests.

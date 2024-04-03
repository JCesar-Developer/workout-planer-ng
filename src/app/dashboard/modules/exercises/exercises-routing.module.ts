import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercisesPageComponent } from './pages/exercises-page/exercises-page.component';

const routes: Routes = [
  {
    path: '',
    component: ExercisesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExercisesRoutingModule { }

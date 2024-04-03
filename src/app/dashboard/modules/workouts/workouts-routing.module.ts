import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutsPageComponent } from './pages/workouts-page/workouts-page.component';

const routes: Routes = [
  {
    path: '',
    component: WorkoutsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutsRoutingModule { }

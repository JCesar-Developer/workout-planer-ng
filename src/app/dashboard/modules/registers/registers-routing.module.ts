import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistersPageComponent } from './pages/registers/registers-page.component';

const routes: Routes = [
  {
    path: '',
    component: RegistersPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistersRoutingModule { }

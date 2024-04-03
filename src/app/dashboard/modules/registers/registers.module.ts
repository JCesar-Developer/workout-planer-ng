import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistersRoutingModule } from './registers-routing.module';
import { RegistersPageComponent } from './pages/registers/registers-page.component';


@NgModule({
  declarations: [
    RegistersPageComponent
  ],
  imports: [
    CommonModule,
    RegistersRoutingModule
  ]
})
export class RegistersModule { }

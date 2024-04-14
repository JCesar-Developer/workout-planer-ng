import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    Error404PageComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TruncatePipe,
  ]
})
export class AppSharedModule { }

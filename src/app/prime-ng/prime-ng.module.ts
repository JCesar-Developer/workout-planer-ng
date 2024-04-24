import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChipModule } from 'primeng/chip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@NgModule({
  exports: [
    AutoCompleteModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    ChipModule,
    ConfirmPopupModule,
    DropdownModule,
    DynamicDialogModule,
    InputNumberModule,
    InputTextModule,
    ToastModule,
  ]
})
export class PrimeNgModule { }

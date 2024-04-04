import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@NgModule({
  exports: [
    FormsModule,

    AutoCompleteModule,
    ButtonModule,
    CardModule,
    ChipModule,
    DynamicDialogModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
  ]
})
export class PrimeNgModule { }

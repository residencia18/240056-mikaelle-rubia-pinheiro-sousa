import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientJsonpModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import {  ConfirmationService } from 'primeng/api';
import { SuinoHomeComponent } from './pages/suino-home/suino-home.component';
import { SUINO_ROUTES } from './suinos.routing';
import { SuinoTableComponent } from './components/suino-table/suino-table.component';
import { SuinoFormComponent } from './components/suino-form/suino-form.component';




@NgModule({
  declarations: [
    SuinoHomeComponent,
    SuinoTableComponent,
    SuinoFormComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(SUINO_ROUTES),
    SharedModule,
    HttpClientJsonpModule,
    //PRIMENG
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule
  ],
  providers: [DialogService, ConfirmationService]
})
export class SuinosModule { }

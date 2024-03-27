import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';

import { ConfirmationService } from 'primeng/api';
import { SESSAO_ROUTES } from './sessao.routing';
import { SessaoHomeComponent } from './pages/sessao-home/sessao-home.component';
import { SessaoFormComponent } from './components/sessao-form/sessao-form.component';
import { SessaoTableComponent } from './components/sessao-table/sessao-table.component';
import { SharedModule } from '../../shared/shared.module'


@NgModule({
  declarations: [
    SessaoHomeComponent,
    SessaoFormComponent,
    SessaoTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientJsonpModule,
    RouterModule.forChild(SESSAO_ROUTES),
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
    TooltipModule,
    SharedModule
  ],
  providers: [DialogService, ConfirmationService],

})
export class SessaoModule { }

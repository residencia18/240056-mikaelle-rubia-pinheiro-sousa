import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalhesSessaoHomeComponent } from './pages/detalhes-sessao-home/detalhes-sessao-home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
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
import { SharedModule } from '../../shared/shared.module';
import { ConfirmationService } from 'primeng/api';
import { DETALHES_SESSAO_ROUTES } from './detalhes-sessao.routing';
import { DetalhesSessaoFormComponent } from './components/detalhes-sessao-form/detalhes-sessao-form.component';
import { DetalhesSessaoTableComponent } from './components/detalhes-sessao-table/detalhes-sessao-table.component';


@NgModule({
  declarations: [
    DetalhesSessaoHomeComponent,

    DetalhesSessaoTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DETALHES_SESSAO_ROUTES),
    SharedModule,
    HttpClientJsonpModule,
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
  ],
  providers: [DialogService, ConfirmationService],
})
export class DetalhesSessaoModule { }

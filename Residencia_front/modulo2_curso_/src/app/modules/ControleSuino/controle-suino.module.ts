import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CONTROLE_SUINO_ROUTES } from './controle-suino.routing';
import { DialogService} from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { ControleSuinoTableComponent } from './components/controle-suino-table/controle-suino-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientJsonpModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ControleSuinosComponent } from './pages/controle-suinos/controle-suinos.component';
import { ControleSuinoFormComponent } from './components/controle-suino-form/controle-suino-form.component';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    ControleSuinoTableComponent,
    ControleSuinosComponent,
    ControleSuinoFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CONTROLE_SUINO_ROUTES),
    CommonModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientJsonpModule,
    SharedModule,
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
export class ControleSuinoModule { }

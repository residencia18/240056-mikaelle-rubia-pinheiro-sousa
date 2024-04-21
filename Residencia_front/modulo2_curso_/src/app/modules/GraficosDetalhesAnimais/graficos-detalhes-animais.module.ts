import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GRAFICOS_DETALHES_HOUTES } from './graticos-detalhes-animais.routing'
import { HttpClientJsonpModule } from '@angular/common/http';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from '../../shared/shared.module';

import { GraficosSuinosComponent } from './components/graficos-suinos/graficos-suinos.component';
import { GraticosDetalhesAnimaisHomeComponent } from './pages/graticos-detalhes-animais-home/graticos-detalhes-animais-home.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GraficosSuinosComponent,
    GraticosDetalhesAnimaisHomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(GRAFICOS_DETALHES_HOUTES),
    HttpClientJsonpModule,
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DropdownModule,
    CardModule,
    TooltipModule,
    ToastModule,
    ChartModule,
    SharedModule
  ],
  providers: [DialogService, ConfirmationService],
})
export class GraficosDetalhesAnimaisModule { }

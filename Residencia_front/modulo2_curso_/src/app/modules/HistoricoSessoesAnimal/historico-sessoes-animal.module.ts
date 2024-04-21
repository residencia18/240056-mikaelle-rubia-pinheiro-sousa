import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { SharedModule } from '../../shared/shared.module'
import { HISTORICO_SESSAO_HOUTES } from './historico-sessoes-animal.routing';
import { HistoricoSessoesAnimalComponent } from './pages/historico-sessoes-animal/historico-sessoes-animal.component';
import { HistorioSessaoAnimalTableComponent } from './components/historio-sessao-animal-table/historio-sessao-animal-table.component';
import { DialogService} from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

import { HttpClientJsonpModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HistoricoSessoesAnimalComponent,
    HistorioSessaoAnimalTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(HISTORICO_SESSAO_HOUTES),
    //PrimeNG
    HttpClientJsonpModule,
    SidebarModule,
    TableModule,
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
export class HistoricoSessoesAnimalModule { }

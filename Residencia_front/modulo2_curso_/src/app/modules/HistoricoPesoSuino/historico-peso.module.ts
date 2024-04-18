import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricopesoHomeComponent } from './pages/historicopeso-home/historicopeso-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HISTORICOPESO_ROUTES} from './historico.routing';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { HttpClientJsonpModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { HistoricoPesoTableComponent } from './components/historico-peso-table/historico-peso-table.component';
import { HistoricopesoFormComponent } from './components/historicopeso-form/historicopeso-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    declarations: [
        HistoricopesoHomeComponent,
        HistoricopesoFormComponent,
        HistoricoPesoTableComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(HISTORICOPESO_ROUTES),
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
export class HistoricoPesoModule { }

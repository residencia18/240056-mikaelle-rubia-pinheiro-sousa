import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sessao } from '../../../../models/interfaces/Sessao/sessao';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { SessaoDataTransferService } from '../../../../shared/service/sessao/sessao-data-transfer.service';
import { SessaoService } from '../../../../services/sessao/sessao.service';
import { MessageService } from 'primeng/api';
import { SuinoDataTransferService } from '../../../../shared/service/suinos/suino-data-transfer.service';

@Component({
  selector: 'app-historico-sessoes-animal',
  templateUrl: './historico-sessoes-animal.component.html',
  styleUrl: './historico-sessoes-animal.component.css'
})
export class HistoricoSessoesAnimalComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject();
  Sessoes_historico: Sessao[] =[];
  Animais: Number[] =[]


  constructor(private sessaoDataTransferService: SessaoDataTransferService,
    private suinoDtService: SuinoDataTransferService){}

  ngOnInit(): void {

    this.Animais = this.suinoDtService.listBrinco
    this.Sessoes_historico = this.sessaoDataTransferService.sessaoHistorico

  }


  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }

}

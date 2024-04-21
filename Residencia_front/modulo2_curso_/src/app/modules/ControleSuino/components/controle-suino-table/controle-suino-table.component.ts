import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Sessao } from '../../../../models/interfaces/Sessao/sessao';
import { Suino } from '../../../../models/interfaces/Suino/Suino';
import { PesoSuino } from '../../../../models/interfaces/Peso/PesoSuino';
import { EventActon, controleSuino } from '../../../../models/enum/suino-enum';
import { SuinosService } from '../../../../services/suino/suinos.service';
import { MessageService } from 'primeng/api';
import { SuinoDataTransferService } from '../../../../shared/service/suinos/suino-data-transfer.service';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SessaoService } from '../../../../services/sessao/sessao.service';
import { HistoricoPesoService } from '../../../../services/historicoPeso/historico-peso.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-controle-suino-table',
  templateUrl: './controle-suino-table.component.html',
  styleUrl: './controle-suino-table.component.css'
})
export class ControleSuinoTableComponent implements OnInit, OnDestroy{
  private readonly destroy$:Subject<void> = new Subject();
  @Input() ControlSessoes: Sessao[]=[]
  @Input() ControlSuinos: Suino[]=[]
  @Input() ControlHistoricoPesoSuinos: PesoSuino[]=[]
  pesoSuinoList: PesoSuino[]= [];
  sessaoList: Sessao[]= [];
  public id_suino:string= ''
  brincoContrelo: Number = 0;


  public controleSuino: controleSuino[] =[]
  public ControleSelected = ''

  constructor(private suinosService: SuinosService,
    public ref: DynamicDialogConfig,
    private messageService: MessageService,
    private suinosDtService :SuinoDataTransferService,
    private router: Router,
    private sessaoService: SessaoService,
    private pesoSuinoService: HistoricoPesoService
    ){}

  ngOnInit(): void {

    this.brincoContrelo = Number(this.ref.data.event.id)

    this.getAPISuinoDtas()
    this.getAPISessaoDtas()

    }

  getAPISessaoDtas() {
    this.sessaoService. getAllSessao()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        if(response.length > 0){
          console.log("Action",response);
          for(let sessao of response){
            if(sessao.animais.includes(this.brincoContrelo.toString())){
              let controleSuino: controleSuino = {
                atividade: sessao.atividade,
                data: sessao.data_atividade,
                status: 'Concluída'
              };
              this.controleSuino.push(controleSuino);
            }
          }

        }
      }, error:(err)=>{
        console.log(err);
        this.messageService.add({
          severity:'error',
          summary:'Erro',
          detail: 'Erro ao buscar sesssões',
          life: 2500
        })
      }
    })

  }

  getAPISuinoDtas() {
    this.suinosService.getAllSuinos()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        if(response.length > 0){
          for(let suino of response){
            if(suino.brinco === this.brincoContrelo){
              this.id_suino = suino.id
            }
          }
        }
        this.getAPIPesoSuinoDtas(this.id_suino)
        console.log("id--", this.id_suino);
      }, error:(err)=>{
        console.log(err);
        this.router.navigate(['/dashboard']);
        this.messageService.add({
          severity:'error',
          summary:'Erro',
          detail: 'Erro ao buscar animais',
          life: 2500
        })
      }
    })

  }

  getAPIPesoSuinoDtas(idSuino: string) {
    this.pesoSuinoService.getAllPeso(idSuino)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        if(response.length > 0){
          for(let peso of response){
              let controleSuino: controleSuino = {
                atividade: 'Pesagem',
                data: peso.dataPesagem,
                status: peso.pesoKg.toString()
              };
              this.controleSuino.push(controleSuino);
            }

        }

      }, error:(err)=>{
        console.log(err);
        this.router.navigate(['/dashboard']);
        this.messageService.add({
          severity:'error',
          summary:'Erro',
          detail: 'Erro ao buscar pesos',
          life: 2500
        })
      }
    })

  }


  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }

}

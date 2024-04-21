import { Component,  OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { SuinoDataTransferService } from '../../../../shared/service/suinos/suino-data-transfer.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SessaoService } from '../../../../services/sessao/sessao.service';
import { HistoricoPesoService } from '../../../../services/historicoPeso/historico-peso.service';
import { PesoSuino } from '../../../../models/interfaces/Peso/PesoSuino';
import { graficoSuino } from '../../../../models/enum/suino-enum';
import { Sessao } from '../../../../models/interfaces/Sessao/sessao';

@Component({
  selector: 'app-graficos-suinos',
  templateUrl: './graficos-suinos.component.html',
  styleUrl: './graficos-suinos.component.css'
})
export class GraficosSuinosComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject();
  public detalhesSuinosChatsDts!:ChartData;
  public detalhesSuinosChatsOptions! : ChartOptions;
  sesaoList: Sessao [] = []
  pesoSuinoList: PesoSuino[]= [];
  public controleSuino: graficoSuino[] =[]
  public controleSessao: graficoSuino[] =[]
  public datasPessagem: String [] =[ ]
  public titulo: String=''

  constructor(private suinoDtService: SuinoDataTransferService,
    private messageService: MessageService,
    private router: Router,
    private sessaoService: SessaoService,
    private pesoSuinoService: HistoricoPesoService
  ){}



  ngOnInit(): void {
    this.titulo = "Gráfico de " + this.suinoDtService.grafico
    if(this.suinoDtService.grafico == 'Pesagem'){
      this.getAPIPesoSuinoDtas()
    }if(this.suinoDtService.grafico == 'Atividade'){
      this.getAPISessaoDtas()
      console.log("Action",this.controleSessao);

    }

}

getAPIPesoSuinoDtas() {
  this.pesoSuinoService.getAll()
  .pipe(takeUntil(this.destroy$))
  .subscribe({
    next:(response)=>{
      if(response.length > 0){
        const pesoCount: { [key: string]: number } = {};
        for (let peso of response) {
          const pesoString = peso.pesoKg.toString();

          if (pesoString in pesoCount) {
              pesoCount[pesoString]++;
          } else {
              pesoCount[pesoString] = 1;
          }
      }
      for (let pesoString in pesoCount) {
          const cont = pesoCount[pesoString];
          const status = pesoString;

          const controleSuino: graficoSuino = {
              cont: cont,
              status: status
          };

          this.controleSuino.push(controleSuino);
      }
        this.setPessagemChartConfig()
      }
      console.log("controle", this.controleSuino)
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

getAPISessaoDtas() {
  this.sessaoService. getAllSessao()
  .pipe(takeUntil(this.destroy$))
  .subscribe({
    next:(response)=>{
      if(response.length > 0){

        const sessaoCount: { [key: string]: number } = {};
        for (let sessao of response) {
          const sessaoString =sessao.atividade;

          if (sessaoString in sessaoCount) {
              sessaoCount[sessaoString]++;
          } else {
              sessaoCount[sessaoString] = 1;
          }
      }
      for (let sessaoString in sessaoCount) {
          const cont = sessaoCount[sessaoString];
          const status = sessaoString;

          const controleSessao: graficoSuino = {
              cont: cont,
              status: status
          };

          this.controleSessao.push(controleSessao);
        }
        this.setAtividadeChartConfig()
      }
      console.log("Sessao", this.controleSessao)
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

  setPessagemChartConfig(){
    if(this.controleSuino.length > 0){

      const documentStyle = getComputedStyle(document.documentElement);
      const  textColor = documentStyle.getPropertyValue('--text-color');
      const  textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


      this.detalhesSuinosChatsDts = {
        labels: ['Peso dos Animais'],
        datasets: this.controleSuino.map(item => ({
          label: String(item.status)+'kg',
          backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
          borderColor: documentStyle.getPropertyValue('--indigo-400'),
          hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
          data: [Number(item.cont)],
          fill: false,
        })),
      };

      this.detalhesSuinosChatsOptions={
        maintainAspectRatio: false,
        aspectRatio :0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },

        scales:{
          x:{
            ticks: {
              color:textColorSecondary,
              font:{
                weight: 500,
                },
              },
              grid: {
                color: surfaceBorder
              },
          },
          y:{
            ticks: {
              color:textColorSecondary,
            },
              grid: {
                color: surfaceBorder
              },
          },
        }
      }
    }
  }

  setAtividadeChartConfig(){
    if(this.controleSessao.length > 0){

      const documentStyle = getComputedStyle(document.documentElement);
      const  textColor = documentStyle.getPropertyValue('--text-color');
      const  textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


      this.detalhesSuinosChatsDts = {
        labels: ['Atividades dos Animais'],
        datasets: this.controleSessao.map(item => ({
          label: String(item.status),
          backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
          borderColor: documentStyle.getPropertyValue('--indigo-400'),
          hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
          data: [Number(item.cont)],
          fill: false,
        })),
      };

      this.detalhesSuinosChatsOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 500,
              },
            },
            grid: {
              color: surfaceBorder
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder
            },
          },
        }
      };
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}




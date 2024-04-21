import { Component, OnDestroy, OnInit } from '@angular/core';
import { SuinosService } from '../../../../services/suino/suinos.service';
import { MessageService } from 'primeng/api';
import { Suino } from '../../../../models/interfaces/Suino/Suino';
import { SuinoDataTransferService } from '../../../../shared/service/suinos/suino-data-transfer.service';
import { Subject} from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';
import { Sessao } from '../../../../models/interfaces/Sessao/sessao';


@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',

})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject();
  suinosList: Suino [] = []
  public suinosChatsDts!:ChartData;
  public suinosChatsOptions! : ChartOptions;


  constructor(private suinoService: SuinosService,
     private messageService: MessageService,
     private suinoDtService: SuinoDataTransferService){}

  ngOnInit(): void {
      this.getSuinosDatas();

  }


  getSuinosDatas():void {

    this.suinoService.getAllSuinos()
    .subscribe({
      next:(response)=>{
        this.suinosList = response;
        console.log("suinos:" , this.suinosList)
        this.suinoDtService.setSuinosDatas(this.suinosList);

        if(this.suinosList.length > 0){
          this.setSuinosChartConfig();
        }

      }, error:(err)=>{
        console.log(err);
        this.messageService.add({
          severity:'error',
          summary:'Erro',
          detail: 'Erro ao listar os animais',
          life: 2500
        })
    }
    })
  }


  setSuinosChartConfig(){
    if(this.suinosList.length > 0){

      const documentStyle = getComputedStyle(document.documentElement);
      const  textColor = documentStyle.getPropertyValue('--text-color');
      const  textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


      const quantidadeTotal = this.suinosList.length;
      const quantidadeSexoF = this.suinosList?.filter(suino=> suino.sexo === 'F').length;
      const quantidadeSexoM = this.suinosList?.filter(suino=> suino.sexo === 'M').length;


      this.suinosChatsDts ={
        labels:  ['Total de Animais'],
        datasets:[
          {
            label:'Quantidade',
            backgroundColor:documentStyle.getPropertyValue('--indigo-400'),
            borderColor: documentStyle.getPropertyValue('--indigo-400'),
            hoverBackgroundColor:documentStyle.getPropertyValue('--indigo-500' ),
            data: [quantidadeTotal],
          },
          {
            label:'Quantidade Suino sexo F',
            backgroundColor:documentStyle.getPropertyValue('--indigo-400'),
            borderColor: documentStyle.getPropertyValue('--indigo-400'),
            hoverBackgroundColor:documentStyle.getPropertyValue('--indigo-500' ),
            data: [quantidadeSexoF],
          },
          {
            label:'Quantidade Suino sexo M',
            backgroundColor:documentStyle.getPropertyValue('--indigo-400'),
            borderColor: documentStyle.getPropertyValue('--indigo-400'),
            hoverBackgroundColor:documentStyle.getPropertyValue('--indigo-500' ),
            data: [quantidadeSexoM],
          },
        ],
      };

      this.suinosChatsOptions={
        maintainAspectRatio: false,
        aspectRatio :0.8,
        plugins:{
          legend: {
            labels: {
              color:textColor
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

    //evitar vazamento de memória
    ngOnDestroy(): void{
      this.destroy$.next();
      this.destroy$.complete();
    }
}

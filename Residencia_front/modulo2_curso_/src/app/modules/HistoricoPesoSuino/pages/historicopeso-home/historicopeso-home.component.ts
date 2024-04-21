import { EventActionPeso_ } from './../../../../models/enum/suino-enum';
import { SuinoDataTransferService } from './../../../../shared/service/suinos/suino-data-transfer.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import {  ConfirmationService, MessageService } from 'primeng/api';
import { Suino } from '../../../../models/interfaces/Suino/Suino';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HistoricopesoFormComponent } from '../../components/historicopeso-form/historicopeso-form.component';
import { PesoSuino } from '../../../../models/interfaces/Peso/PesoSuino';
import { HistoricoPesoService } from '../../../../services/historicoPeso/historico-peso.service';


@Component({
  selector: 'app-historicopeso-home',
  templateUrl: './historicopeso-home.component.html',
  styleUrl: './historicopeso-home.component.css',

})
export class HistoricopesoHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject();
  pesoSuinoList: PesoSuino[]= [];
  id :string=''
  private ref!: DynamicDialogRef;

  suino: Suino | null = null;

  constructor(private messageService: MessageService,
    private suinosDtService :SuinoDataTransferService,
    private dialogService: DialogService,
    private pesoSuinoService: HistoricoPesoService,
    private confirmationService: ConfirmationService,
    private router: Router){}


  ngOnInit(): void {
    this.getServiceHistoricoData(this.suinosDtService.id_suino);

  }
  getServiceHistoricoData(id: string){

    const pesoLoaded  = this.suinosDtService.getPesoDatas(id);
    if (pesoLoaded.length > 0) {
      this.pesoSuinoList = pesoLoaded;
      console.log("DADOS DOS PESOS", this.pesoSuinoList);
    }else{
      this.getAPIPesoSuinoDtas();


    }
  }
  getAPIPesoSuinoDtas() {
    this.pesoSuinoService.getAllPeso(this.suinosDtService.id_suino)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        if(response.length > 0){
          this.pesoSuinoList = response;
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

  handlepesoEvent(event: EventActionPeso_ ): void{
    if(event){
      event.suino_id = this.suinosDtService.id_suino;

      this.ref = this.dialogService.open(HistoricopesoFormComponent,{
        header: event?.action,
        width:'70%',
        contentStyle:{overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data:{
          event:event,
          peso: this.pesoSuinoList,
        }
      })
      this.ref.onClose.pipe(takeUntil(this.destroy$))
      .subscribe({
        next:()=>this.getAPIPesoSuinoDtas(),
    })
    }

  }

  handleDeletePeso(event:{id: string, pesokg: number}): void{
    if(event){
      this.deletePeso(event.id);
      const id = event.id;
      this.confirmationService.confirm({
        message:'Confirma a exclusão do peso?',
        header:'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel:'Não',
        accept:() =>this.deletePeso(id)
      })
    }
  }
  deletePeso(id: string) {
    if(id){
      this.pesoSuinoService.deletePeso(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(response)=>{
          if(response){
            this.messageService.add({
              severity:'success',
              summary:'Sucesso',
              detail: 'Peso removido com sucesso!',
              life: 2500
            });
          }
          this.getAPIPesoSuinoDtas();
        }, error:(err)=>{
          console.log(err);
          this.messageService.add({
            severity:'error',
            summary:'Erro',
            detail: 'Erro ao deletar Suino',
            life: 2000
          })
        }
      })
    }
  }

  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }
}

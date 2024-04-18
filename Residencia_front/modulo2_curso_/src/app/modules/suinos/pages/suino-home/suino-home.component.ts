import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SuinoDataTransferService } from './../../../../shared/service/suinos/suino-data-transfer.service';
import { SuinosService } from './../../../../services/suino/suinos.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Suino } from '../../../../models/interfaces/Suino/Suino';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SuinoFormComponent } from '../../components/suino-form/suino-form.component';
import {EventActionPeso_, EventActon} from '../../../../models/enum/suino-enum'
@Component({
  selector: 'app-suino-home',
  templateUrl: './suino-home.component.html',
  styleUrl: './suino-home.component.css'
})
export class SuinoHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  suinosList: Suino [] = []


  constructor(private suinosService: SuinosService,
    private messageService: MessageService,
    private suinosDtService :SuinoDataTransferService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    ){}

  ngOnInit(): void {
      this.getServiceSuinosDt();
  }
  getServiceSuinosDt() {
    const suinosLoaded =  this.suinosDtService.getSuinosDatas();
    if(suinosLoaded.length > 0){
      this.suinosList = suinosLoaded;

    }else{
      this.getAPISuinoDtas();

    }
    console.log("DADOS DOS SUINOS", this.suinosList)

  }
  getAPISuinoDtas() {
    this.suinosService.getAllSuinos()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        if(response.length > 0){
          this.suinosList = response;
        }
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
  handleSuinoEvent(event: EventActon ): void{
    if(event){

      this.ref = this.dialogService.open(SuinoFormComponent,{
        header: event?.action,
        width:'70%',
        contentStyle:{overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data:{
          event:event,
          suinosList: this.suinosList,
        }
      })
      this.ref.onClose.pipe(takeUntil(this.destroy$))
      .subscribe({
        next:()=>this.getAPISuinoDtas(),
    })

    }
  }
  handlePesoEvent(event: EventActionPeso_){
    this.suinosDtService.setIdSuino(event.suino_id)
  }
  handleDeleteSuino(event: {id: string, brincoSuino: number}): void{
    if(event){

      this.confirmationService.confirm({
        message: `Confirma a exclusão do Suino de numeração: ${event?.brincoSuino}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept:()=> this.deleteSuino(event?.id),
      })
    }
  }
  deleteSuino(id: string) {
    if(id){
      this.suinosService.deleteSuino(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(response)=>{
          if(response){
            this.messageService.add({
              severity:'success',
              summary:'Sucesso',
              detail: 'Suino removido com sucesso!',
              life: 2500
            });
          }
          this.getAPISuinoDtas();
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

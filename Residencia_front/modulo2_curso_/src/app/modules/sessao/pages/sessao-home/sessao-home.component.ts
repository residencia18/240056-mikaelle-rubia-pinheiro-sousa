import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sessao } from '../../../../models/interfaces/Sessao/sessao';
import { Subject, takeUntil } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SessaoService } from '../../../../services/sessao/sessao.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SessaoDataTransferService } from '../../../../shared/service/sessao/sessao-data-transfer.service';
import { SessaoFormComponent } from '../../components/sessao-form/sessao-form.component';
import { EventActon } from '../../../../models/enum/suino-enum';
import { SuinoHomeComponent } from '../../../suinos/pages/suino-home/suino-home.component';

@Component({
  selector: 'app-sessao-home',
  templateUrl: './sessao-home.component.html',
  styleUrl: './sessao-home.component.css'
})
export class SessaoHomeComponent implements OnInit, OnDestroy {

  private readonly destroy$:Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  sessaoList: Sessao [] =[];


  constructor(private sessaoService: SessaoService,
    private messageService: MessageService,
    private router: Router,
    private sessaoDataTransferService: SessaoDataTransferService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    ){}



  ngOnInit(): void {
    this.getServiceSessaoData()
    this.sessaoDataTransferService.setListabrinco()

  }
  getServiceSessaoData() {
    const sessaoLoaded = this.sessaoDataTransferService.getSessaoDatas();
    if(sessaoLoaded.length > 0) {
      this.sessaoList = sessaoLoaded;
    }else{
      this.getAPISessaoDtas();
    }
    console.log("DADOS DOS SSESSAO", this.sessaoList)
  }
  getAPISessaoDtas() {
    this.sessaoService.getAllSessao()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        if(response.length > 0){
          this.sessaoList = response;
        }
      }, error:(err)=>{
        console.log(err);
        this.router.navigate(['/dashboard']);
        this.messageService.add({
          severity:'error',
          summary:'Erro',
          detail: 'Erro ao buscar sesssões',
          life: 2500
        })
      }
    })
  }

  handleSessaoEvent(event: EventActon):void {
    if(event){

      this.ref = this.dialogService.open(SessaoFormComponent,{
        header: event?.action,
        width:'70%',
        contentStyle:{overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data:{
          event:event,
          sessaoList: this.sessaoList,
        }
      })
      this.ref.onClose.pipe(takeUntil(this.destroy$))
      .subscribe({
        next:()=>this.getAPISessaoDtas(),
    })

    }
  }
  handleSessaoDetalhesEvent(event: EventActon) {
    if (event.id !== undefined) {
      this.sessaoDataTransferService.setIdSessao(event.id);
    }
  }

  handleDeleteSessao(event: any) {
    if(event){

      this.confirmationService.confirm({
        message: `Confirma a exclusão de Sessao`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept:()=> this.deleteSessao(event?.id),
      })
    }
  }
  deleteSessao(id: string) {
    if(id){
      this.sessaoService.deleteSessao(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(response)=>{
          if(response){
            this.messageService.add({
              severity:'success',
              summary:'Sucesso',
              detail: 'Sessão removido com sucesso!',
              life: 2500
            });
          }
          this.getAPISessaoDtas();
        }, error:(err)=>{
          console.log(err);
          this.messageService.add({
            severity:'error',
            summary:'Erro',
            detail: 'Erro ao deletar Sessão',
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

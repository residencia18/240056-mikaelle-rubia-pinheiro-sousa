import { PesoSuino } from './../../../../models/interfaces/Peso/PesoSuino';
import { Suino } from './../../../../models/interfaces/Suino/Suino';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventActionPeso_, HistoricoEvent } from '../../../../models/enum/suino-enum';


import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SuinoDataTransferService } from '../../../../shared/service/suinos/suino-data-transfer.service';
import { HistoricoPesoService } from '../../../../services/historicoPeso/historico-peso.service';


@Component({
  selector: 'app-historicopeso-form',
  templateUrl: './historicopeso-form.component.html',
  styleUrl: './historicopeso-form.component.css'
})
export class HistoricopesoFormComponent implements OnInit, OnDestroy{
  private readonly destroy$:Subject<void> = new Subject();
  public pesoSelect!: PesoSuino;
  public suino!: Suino;
  public pesoAction!: PesoSuino;
  pesoDatas: PesoSuino[] =[]
  pesoListaDatas: PesoSuino[] =[]

  public PesoSuinoAction!:{
    event: EventActionPeso_,
    historicoData: PesoSuino []
  }

  public addPesoForm = this.formBuilder.group({
    dataPesagem: ['', Validators.required],
    pesoKg: ['', Validators.required],
  })


  public editPesoForm = this.formBuilder.group({
    dataPesagem: ['', Validators.required],
    pesoKg: ['', Validators.required],
  })

  public addPesoEvent = HistoricoEvent.ADD_PESO_EVENT;
  public editPesoEvent =HistoricoEvent.EDIT_PESO_EVENT;

  constructor(private historicoService: HistoricoPesoService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router,
    public ref: DynamicDialogConfig,
    private suinosDtService :SuinoDataTransferService){}


  ngOnInit(): void {
    this.PesoSuinoAction = this.ref.data;
    this.pesoAction = this.ref.data?.event?.peso

    if(this.PesoSuinoAction?.event?.action == this.editPesoEvent){
      this.getPesoSelectedDatas(this.ref.data?.event?.peso)

    }
    this.getAllPesos();
  }

  getAllPesos() {
    this.historicoService.getAllPeso(this.suinosDtService.id_suino)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        if(response.length > 0){
          this.pesoDatas = response;
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

  handleSubmitAddPeso(): void {
    if (this.addPesoForm?.value && this.addPesoForm?.valid) {
        const { dataPesagem, pesoKg } = this.addPesoForm.value;

        const pesoExiste = this.pesoDatas.some(data=> data.dataPesagem == dataPesagem)
        if(pesoExiste){
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'O Suino já tem pesagem para esse data',
            life: 3000
        });
        } else {
          const dataPesagemValida = dataPesagem || '';
          const pesoSuinoData ={
            dataPesagem: dataPesagemValida,
            pesoKg: Number(this.addPesoForm.value?.pesoKg),
            id_suino:this.suinosDtService.id_suino
          }
          this.historicoService.addPeso(pesoSuinoData)
          .pipe()
          .subscribe({
            next:(response)=>{
              if(response){
                this.messageService.add({
                  severity:'success',
                  summary:'Sucesso',
                  detail: 'Peso adicionado com sucesso!',
                  life: 2500
                });
                this.pesoDatas = []
              }

            }, error:(err)=>{
              console.log(err);
              this.messageService.add({
                severity:'error',
                summary:'Erro',
                detail: 'Erro ao adicionar Peso',
                life: 2000
              })
            }
          })
        }
    }

    this.addPesoForm.reset();
  }

  handleSubmitEditPeso(): void {
    if (this.editPesoForm?.valid) {
      const pesoExiste = this.pesoDatas.some(data=> data.dataPesagem == this.editPesoForm.value.dataPesagem && data.pesoKg == Number(this.editPesoForm.value.pesoKg))
      if (pesoExiste) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'O Suino já tem pesagem para esse data.',
          life: 3000
      })
    }else{
      const requesEditPeso ={
          dataPesagem: this.editPesoForm.value.dataPesagem ?? '',
          pesoKg: Number(this.editPesoForm.value.pesoKg),
          id_suino:this.ref.data?.event?.peso?.id_suino

      }

      this.historicoService.editPeso(requesEditPeso, this.ref.data?.event?.peso?.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:()=>{
          this.messageService.add({
            severity:'sucess',
            summary:'Sucesso',
            detail: 'Peso editado com sucesso',
            life: 2500
          })
          this.editPesoForm.reset();
          this.getAllPesos();
        },error:(err)=>{
          console.log(err);
          this.router.navigate(['/suino']);
          this.messageService.add({
            severity:'error',
            summary:'Erro',
            detail: 'Erro ao buscar peso',
            life: 2500
          })
        }
      });
    }
  }
}

  getPesoSelectedDatas(pesoSelect : PesoSuino) {

    if (pesoSelect) {
        this.editPesoForm.setValue({
          dataPesagem: pesoSelect.dataPesagem,
          pesoKg: String(pesoSelect.pesoKg)
        });
      }
  }


  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }


}

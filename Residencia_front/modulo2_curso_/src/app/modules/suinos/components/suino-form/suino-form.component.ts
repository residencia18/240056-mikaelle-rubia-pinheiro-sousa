import { PesoSuino } from './../../../../models/interfaces/Peso/PesoSuino';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SuinosService } from '../../../../services/suino/suinos.service';
import { MessageService } from 'primeng/api';

import { Router } from '@angular/router';
import { Suino } from '../../../../models/interfaces/Suino/Suino';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import {EventActon} from '../../../../models/enum/suino-enum'
import { SuinoDataTransferService } from '../../../../shared/service/suinos/suino-data-transfer.service';
import { SuinoEvent } from '../../../../models/enum/suino-enum';

@Component({
  selector: 'app-suino-form',
  templateUrl: './suino-form.component.html',
})
export class SuinoFormComponent implements OnInit, OnDestroy {


  private readonly destroy$:Subject<void> = new Subject();
  public status_suino: string[] = ['Ativo', 'Vendido', 'Morto'];
  sexo_suino:  string[] = ['F', 'M'];
  public selectedStatus:string = '';
  public selectedSexo:string = '';
  public suinoSelectedDatas!: Suino;
  suinosDatas: Suino [] = []
  suinosListDatas:Suino [] = []
  historicoPesoGet: PesoSuino[]= []
  public suinoAction!:{
    event: EventActon,
    suinoData: Suino []
  }


  public addSuinoForm = this.formBuilder.group({
    brinco: ['', Validators.required],
    brincoPai: ['', Validators.required],
    brincoMae: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    dataSaida: ['', Validators.required],
    status: ['', Validators.required],
    sexo: ['', Validators.required],


  })

  public editSuinoForm = this.formBuilder.group({
    brinco: ['', Validators.required],
    brincoPai: ['', Validators.required],
    brincoMae: ['', Validators.required],
    dataNascimento: ['', Validators.required],
    dataSaida: ['', Validators.required],
    status: ['', Validators.required],
    sexo: ['', Validators.required],

  })

  public addSuinoEvent = SuinoEvent.ADD_SUINO_EVENT;
  public editSuinoEvent = SuinoEvent.EDIT_SUINO_EVENT;
  public historicSuinoEvent = SuinoEvent.HISTORIC_SUINO_EVENT;
  public brinco_id_get: number =0

  constructor(private suinosService: SuinosService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router,
    public ref: DynamicDialogConfig,
    private suinosDtService :SuinoDataTransferService,){}

  ngOnInit(): void {
    this.suinoAction = this.ref.data;
    if(this.suinoAction?.event?.action == this.editSuinoEvent){
      this.getSuinoSelectedDatas(this.suinoAction?.event?.id);

    }
    this.getAllSuinos();

  }

  getAllSuinos() {
      this.suinosService.getAllSuinos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(response)=>{
          if(response.length > 0){
            this.suinosDatas = response;
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

  handleSubmitAddSuino(): void {
    if(this.addSuinoForm?.value && this.addSuinoForm?.valid){
      const brincoNovo: number = Number(this.addSuinoForm.value?.brinco);


      const brincoExiste = this.suinosDatas.some(suino => suino.brinco === brincoNovo);

      if (brincoExiste) {
          // Se o brinco já existe, exiba uma mensagem de erro
          this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'O brinco já foi adicionado anteriormente.',
              life: 3000
          });
      } else {
      const suinoData = {
        brinco: Number(this.addSuinoForm.value?.brinco),
        brincoPai: Number(this.addSuinoForm.value?.brincoPai) ,
        brincoMae: Number(this.addSuinoForm.value?.brincoMae) ,
        dataNascimento: this.addSuinoForm.value?.dataNascimento as string,
        dataSaida: this.addSuinoForm.value?.dataSaida as string,
        status: this.addSuinoForm.value?.status as string,
        sexo: this.addSuinoForm.value?.sexo as string,

      };
      console.log("Add suino", suinoData)
      this.suinosService.addSuino(suinoData)
      .pipe()
      .subscribe({
        next:(response)=>{
          if(response){
            this.messageService.add({
              severity:'success',
              summary:'Sucesso',
              detail: 'Suino adicionado com sucesso!',
              life: 2500
            });
          }
        }, error:(err)=>{
          console.log(err);
          this.messageService.add({
            severity:'error',
            summary:'Erro',
            detail: 'Erro ao adicionar suino',
            life: 2000
          })
        }
      })
      }
    }
      this.addSuinoForm.reset();
    }

    handleEditSuino(): void {
      if(this.editSuinoForm?.value && this.editSuinoForm?.valid && this.suinoAction.event.id){
        const brincoNovo: number = Number(this.editSuinoForm.value?.brinco);

        if (this.brinco_id_get === brincoNovo) {
            // Se o brinco já existe, exiba uma mensagem de erro
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'O brinco já foi adicionado anteriormente.',
                life: 3000
            });
        } else {

          const requesEditSuino ={
            brinco: Number(this.editSuinoForm?.value.brinco),
            brincoPai: Number(this.editSuinoForm?.value.brincoPai),
            brincoMae: Number(this.editSuinoForm?.value.brincoMae),
            dataNascimento: this.editSuinoForm?.value.dataNascimento as string,
            dataSaida: this.editSuinoForm?.value.dataSaida as string,
            status: this.editSuinoForm?.value.status as string,
            sexo: this.editSuinoForm?.value.sexo as string,
            historicoPeso: this.historicoPesoGet
          }

          this.suinosService.editSuino(requesEditSuino, this.suinoAction.event.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next:()=>{
              this.messageService.add({
                severity:'sucess',
                summary:'Sucesso',
                detail: 'Suino editado com sucesso',
                life: 2500
              })
              this.editSuinoForm.reset();
            },error:(err)=>{
              console.log(err);
              this.router.navigate(['/dashboard']);
              this.messageService.add({
                severity:'error',
                summary:'Erro',
                detail: 'Erro ao buscar animais',
                life: 2500
              })
            }
          });
        }
      }
    }

    getSuinoSelectedDatas(id_suino?: string): void{
      const allSuino = this.ref.data.suinosList;

      if (this.ref.data.suinosList && this.ref.data.suinosList.length > 0) {
        const suinoFilter = allSuino.filter(
            (element: any) => element.id === id_suino

        );
        console.log("Suino filter",suinoFilter)

        if(suinoFilter){
          this.suinoSelectedDatas = suinoFilter[0];
          console.log("Suino",this.suinoSelectedDatas)
          this.brinco_id_get = this.suinoSelectedDatas?.brinco;
          this.historicoPesoGet = this.suinoSelectedDatas.historicoPeso
          this.editSuinoForm.setValue({
            brinco: this.suinoSelectedDatas?.brinco.toString(),
            brincoPai: this.suinoSelectedDatas?.brincoPai.toString(),
            brincoMae: this.suinoSelectedDatas?.brincoMae.toString(),
            dataNascimento: this.suinoSelectedDatas?.dataNascimento,
            dataSaida: this.suinoSelectedDatas?.dataSaida,
            status: this.suinoSelectedDatas?.status,
            sexo: this.suinoSelectedDatas?.sexo,

          })
        }
      }
    }

    getSuinoDtas() {
      this.suinosService.getAllSuinos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(response)=>{
          if(response.length > 0){
            this.suinosListDatas = response;
            this.suinosListDatas && this.suinosDtService.setSuinosDatas(this.suinosListDatas);
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

  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }
}


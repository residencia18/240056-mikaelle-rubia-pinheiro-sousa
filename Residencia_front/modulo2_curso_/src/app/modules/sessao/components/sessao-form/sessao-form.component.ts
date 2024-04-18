import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Sessao } from '../../../../models/interfaces/Sessao/sessao';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventActon, SessaoEvent } from '../../../../models/enum/suino-enum';
import { SessaoDataTransferService } from '../../../../shared/service/sessao/sessao-data-transfer.service';
import { SessaoService } from '../../../../services/sessao/sessao.service';
import { atividade_suinos} from '../../../../../environments/environment'
@Component({
  selector: 'app-sessao-form',
  templateUrl: './sessao-form.component.html',
  styleUrl: './sessao-form.component.css'
})
export class SessaoFormComponent implements OnInit, OnDestroy {

handleEditSessao() {
throw new Error('Method not implemented.');
}

  private readonly destroy$:Subject<void> = new Subject();
  public atividades_sessao: string[] = atividade_suinos.vacinas
  public brinco_animais: Number[]=[]
  public selectedbrincoAnimais: Number = 0
  public selectedAtividade:string = '';
  public sessaoSelectedDatas!:Sessao;
  sessaoDatas:Sessao [] = [];
  sessaoListDatas:Sessao [] = [];
  public sessaoAction!:{
    event: EventActon,
    brincos_animal: String []
  }
  public brincosSelected:Number[]=[]


  public addSessaoForm = this.formBuilder.group({
    data_atividade: ['', Validators.required],
    atividade: ['', Validators.required],
    animais: ['', Validators.required],
    descricao: ['', Validators.required],
  })

  public editSessaoForm = this.formBuilder.group({
    data_atividade: ['', Validators.required],
    atividade: ['', Validators.required],
    animais: ['', Validators.required],
    descricao: ['', Validators.required],
  })

  public addSessaovent = SessaoEvent.ADD_SESSAO_EVENT;
  public editSessaovent =SessaoEvent.EDIT_SESSAO_EVENT;

  constructor(private messageService: MessageService,
    private sessaoService: SessaoService,
    private formBuilder: FormBuilder,
    private router: Router,
    public ref: DynamicDialogConfig,
    private sessaoDtService :SessaoDataTransferService){}
  ngOnInit(): void {

    this.sessaoAction = this.ref.data;
    this.brinco_animais = this.sessaoDtService.listBrinco;

    if(this.sessaoAction?.event?.action == this.editSessaovent){
      this.getSessaoSelectedDatas(this.sessaoAction?.event?.id);

    }
    this.getAllSessao();

  }
  getAllSessao() {
    this.sessaoService.getAllSessao()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(response)=>{
          if(response.length > 0){
            this.sessaoDatas = response;
          }
        }, error:(err)=>{
          console.log(err);
          this.router.navigate(['/dashboard']);
          this.messageService.add({
            severity:'error',
            summary:'Erro',
            detail: 'Erro ao buscar sessões',
            life: 2500
          })
        }
      })
  }

  handleSubmitAddSessao(): void {
    if(this.addSessaoForm?.value && this.addSessaoForm?.valid){
      const AtividadeNovo= this.addSessaoForm.value.atividade;
      const DataNova= this.addSessaoForm.value.data_atividade;

      const DataExiste = this.sessaoDatas.some(sessao => sessao.atividade === AtividadeNovo);
      const AtividadeExiste = this.sessaoDatas.some(sessao => sessao.data_atividade === DataNova);

      if (DataExiste && AtividadeExiste) {
          // Se o brinco já existe, exiba uma mensagem de erro
          this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'O brinco já foi adicionado anteriormente.',
              life: 3000
          });
      } else {
        const sessaoData = {

          data: this.addSessaoForm.value?.data_atividade || '',
          atividade: this.addSessaoForm.value?.atividade || '',
          animais: this.brincosSelected.map(brinco => brinco.toString()),
          descricao: this.addSessaoForm.value?.descricao || ''
        };
      console.log("Add suino", sessaoData)
      this.sessaoService.addSessao(sessaoData)
      .pipe()
      .subscribe({
        next:(response)=>{
          if(response){
            this.messageService.add({
              severity:'success',
              summary:'Sucesso',
              detail: 'Sessão adicionado com sucesso!',
              life: 2500
            });
          }
        }, error:(err)=>{
          console.log(err);
          this.messageService.add({
            severity:'error',
            summary:'Erro',
            detail: 'Erro ao adicionar sessão',
            life: 2000
          })
        }
      })
      }
    }
      this.addSessaoForm.reset();
    }


  getSessaoSelectedDatas(id: string | undefined) {
    throw new Error('Method not implemented.');
  }

  addbrinco(brinco: Number) {
    if (!this.brincosSelected.includes(brinco)) {
      this.brincosSelected.push(brinco);
      console.log("brincos ADD", this.brincosSelected);
    } else {
      console.log("O brinco já está na lista:", brinco);
    }
  }

  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }
}

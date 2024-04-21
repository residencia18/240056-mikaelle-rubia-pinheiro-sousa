import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Sessao } from '../../../../models/interfaces/Sessao/sessao';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  private readonly destroy$:Subject<void> = new Subject();
  public atividades_sessao: string[] = atividade_suinos.vacinas
  public brinco_animais: Number[]=[]
  public selectedbrincoAnimais: Number = 0
  public selectedAtividade:string = '';
  public atividade:string = '';
  public sessaoSelectedDatas!:Sessao;
  sessaoDatas:Sessao [] = [];
  sessaoListDatas:Sessao [] = [];
  public sessaoAction!:{
    event: EventActon,
    brincos_animal: String []
  }
  public brincosSelected:Number[]=[]


  public addSessaoForm = this.formBuilder.group({
    data_atividade: ['', { validators: [Validators.required], updateOn: 'blur' }],
    atividade:['', { validators: [Validators.required], updateOn: 'blur' }],
    animais: [[], { validators: [Validators.required], updateOn: 'blur' }],
    descricao: ['', { validators: [Validators.required], updateOn: 'blur' }],
  })

  public editSessaoForm = this.formBuilder.group({
    data_atividade: ['', { validators: [Validators.required], updateOn: 'blur' }],
    atividade: ['', { validators: [Validators.required], updateOn: 'blur' }],
    animais: [null as string[] | null],
    descricao: ['', { validators: [Validators.required], updateOn: 'blur' }],
  })

  verificaDataSessao(formulario: FormGroup) {
    let dataValida = true;

    const dataAtividade = new Date(formulario.get('data_atividade')?.value);

    if (isNaN(dataAtividade.getTime())) {
      return false;
    }
    const dataAtual = new Date();
    if (dataAtividade < dataAtual) {
      dataValida = false;
    }
    return dataValida;
  }

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

      this.getSessaoSelectedDatas(this.ref.data.sessaoList, this.ref.data.event?.id);

    }
    this.getAllSessao();

  }

  formataData(data: String): string{
    return data.substring(8)+ "/" + data.substring(5,7)+ "/" + data.substring(0,4)
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
              detail: 'A data e a atividade já estão cadastradas',
              life: 3000
          });
      }if(!this.verificaDataSessao(this.addSessaoForm)){
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Verifica os campos de data',
          life: 3000
      });
      } else {
        const data = this.addSessaoForm.value?.data_atividade || '';
        const sessaoData = {

          data_atividade: this.formataData(data),
          atividade: this.addSessaoForm.value?.atividade || '',
          animais: this.brincosSelected.map(brinco => brinco.toString()),
          descricao: this.addSessaoForm.value?.descricao || ''
        };
      console.log("Add sessão", sessaoData)
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


  handleEditSessao(): void {
   if(this.editSessaoForm?.valid){

    if(!this.verificaDataSessao(this.editSessaoForm)){
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Verifica os campos de data',
        life: 3000
    });
    } else{
      const AtividadeNovo= this.editSessaoForm.value.atividade;
      const DataNova= this.editSessaoForm.value.data_atividade;

      const dataEditar =  this.editSessaoForm.value?.data_atividade || '';
        const sessaoDataEditar = {
          data_atividade: this.formataData(dataEditar),
          atividade: this.editSessaoForm.value?.atividade || '',
          animais: this.brincosSelected.map(brinco => brinco.toString()),
          descricao: this.editSessaoForm.value?.descricao || ''
        };
      console.log("Editar Sessão", sessaoDataEditar)
      this.sessaoService.editSessao(sessaoDataEditar, this.ref.data.event?.id)
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
      this.editSessaoForm.reset();
    }

    getSessaoSelectedDatas(sessoes: Sessao[], id_sessao: string) {
      let brincos: string[][] = [];

      for (let sessao of sessoes) {
        if (sessao.id == id_sessao) {
          this.atividade = sessao.atividade
          for (let animal of sessao.animais) {
            brincos.push([animal]);
          }
          console.log("aqui tb 01", sessao.atividade)
          this.editSessaoForm.setValue({
            data_atividade: sessao.data_atividade,
            atividade: sessao.atividade,
            animais: brincos.length > 0 ? brincos : null,
            descricao: sessao.descricao,
          });

        }
      }
    }


  addbrinco(brinco: Number) {

    if (!this.brincosSelected.includes(brinco)) {
      this.brincosSelected.push(brinco);
      console.log("brincos ADD", this.brincosSelected);
    } else {
      console.log("O brinco já está na lista:", brinco);
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: `O brinco ${brinco} já está na lista `,
        life: 2500
    })
    }
  }

  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }
}

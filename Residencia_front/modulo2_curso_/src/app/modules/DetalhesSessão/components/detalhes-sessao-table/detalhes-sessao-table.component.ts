import { Sessao } from './../../../../models/interfaces/Sessao/sessao';
import { Component, Input } from '@angular/core';
import { atividade_suinos} from '../../../../../environments/environment'
import { SessaoDataTransferService } from '../../../../shared/service/sessao/sessao-data-transfer.service';

@Component({
  selector: 'app-detalhes-sessao-table',
  templateUrl: './detalhes-sessao-table.component.html',
  styleUrl: './detalhes-sessao-table.component.css'
})
export class DetalhesSessaoTableComponent {
  @Input() Detalhes: Sessao[]=[]
  @Input() Detalhes_animal: Number[]=[]
  public atividades_sessao: string[] = atividade_suinos.vacinas
  public brinco_animais: Number[]=[]


  public SessaoSelected!: Sessao;


  constructor(private sessaoDtService :SessaoDataTransferService){}

  ngOnInit(): void {
    this.brinco_animais = this.sessaoDtService.listBrinco;

  }



}

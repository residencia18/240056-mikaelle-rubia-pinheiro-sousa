import { Sessao } from './../../../../models/interfaces/Sessao/sessao';
import { Component, Input } from '@angular/core';
import { atividade_suinos } from '../../../../../environments/environment';


@Component({
  selector: 'app-historio-sessao-animal-table',
  templateUrl: './historio-sessao-animal-table.component.html',
  styleUrl: './historio-sessao-animal-table.component.css'
})
export class HistorioSessaoAnimalTableComponent {
  @Input() Sessoes: Sessao[]=[];
  @Input() historicoSessaoBrinco: Number[]=[]

  public atividades_sessao: string[] = atividade_suinos.vacinas
  public Sessao!: Sessao;


  public SessaoSelectedHistorico!: Sessao;


  constructor(){}

  getSessoes(brinco: Number, atividade: string): string {
    for(let sessao of this.Sessoes){
      if(sessao.atividade == atividade && sessao.animais.includes(brinco.toString())){
        return "X"
      }
    }
    return "Não aplicada"

  }

  ngOnInit(): void {
    console.log("brincos",this.historicoSessaoBrinco)
    console.log("Sessoes",this.Sessoes)
    this.Sessao = this.Sessoes[0]

  }


}

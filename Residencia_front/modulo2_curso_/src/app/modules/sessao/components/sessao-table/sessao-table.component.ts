import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sessao } from '../../../../models/interfaces/Sessao/sessao';
import { EventActon, SessaoEvent } from '../../../../models/enum/suino-enum';


@Component({
  selector: 'app-sessao-table',
  templateUrl: './sessao-table.component.html',
  styleUrl: './sessao-table.component.css'
})
export class SessaoTableComponent {

  @Input()  Sessao_: Array<Sessao> = []

 public SessaoSelected!: Sessao;


  @Output() sessaoEvent =  new EventEmitter<EventActon>();
  @Output() sessaoDetalhesEvent =  new EventEmitter<EventActon>();
  @Output() deleteSessao =  new EventEmitter<any>();

  public addSessaovent = SessaoEvent.ADD_SESSAO_EVENT;
  public editSessaovent =SessaoEvent.EDIT_SESSAO_EVENT;
  public detalhesSessaovent =SessaoEvent.DETALHES_SESSAO_EVENT
  ngOnInit(): void {

  }

  handleSessaoEvent(action: string, id?: string) {
    if(action && action !== ' '){
      const sessaoEventData= id && id !== '' ? {action, id} : {action}
      console.log("EventDataSessao", sessaoEventData)
      this.sessaoEvent.emit(sessaoEventData)
    }
  }

  handleSessaoDetalhesEvent(action: string, id?: string) {
    if(action && action !== ' '){
      const sessaoDetalheEventData= id && id !== '' ? {action, id} : {action}
      console.log("EventDataSessaoDetralhes", sessaoDetalheEventData)
      this.sessaoDetalhesEvent.emit(sessaoDetalheEventData)
    }
  }

  handleDeleteSessao(id: string, descricao: string ):void {
    if(id !== '' && descricao !== '' ){
      this.deleteSessao.emit({id, descricao});
    }  }

}

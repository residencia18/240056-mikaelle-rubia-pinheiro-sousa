import { PesoSuino } from './../../../../models/interfaces/Peso/PesoSuino';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoricoEvent } from '../../../../models/enum/suino-enum';

@Component({
  selector: 'app-historico-peso-table',
  templateUrl: './historico-peso-table.component.html',
  styleUrl: './historico-peso-table.component.css'
})
export class HistoricoPesoTableComponent {
  @Input() Pesos: Array<PesoSuino> = [];

  @Output() historicoEvent =  new EventEmitter<any>();
  @Output() deletePesoHistorico =  new EventEmitter<any>();
  public HistoricoSelected!: PesoSuino;

  public addPesoEvent = HistoricoEvent.ADD_PESO_EVENT;
  public editPesoEvent =HistoricoEvent.EDIT_PESO_EVENT;


  constructor(){

  }
  handlePesoEvent(action: string, peso?: PesoSuino): void{
    if(action && action !== ' '){
      const pesoEventData = peso && peso !== null ? {action, peso} : {action}
      console.log("suinoEventDataPeso", pesoEventData)

      this.historicoEvent.emit(pesoEventData)
    }

  }
  handleDeletePeso(id: string, pesoKg: string): void {
    if (id !== null) {
        this.deletePesoHistorico.emit({id, pesoKg});
    }
}
}

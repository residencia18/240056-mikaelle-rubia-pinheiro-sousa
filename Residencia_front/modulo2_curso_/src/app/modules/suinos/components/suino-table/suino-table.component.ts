import { Suino } from './../../../../models/interfaces/Suino/Suino';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventActionPeso_, SuinoEvent } from '../../../../models/enum/suino-enum';
import {EventActon} from '../../../../models/enum/suino-enum'

@Component({
  selector: 'app-suino-table',
  templateUrl: './suino-table.component.html',

})
export class SuinoTableComponent {
  @Input() suinos: Array<Suino> = [];

  @Output() suinosEvent =  new EventEmitter<EventActon>();
  @Output() deletsuinosEvent =  new EventEmitter<any>();
  @Output() EventActionPeso =  new EventEmitter<EventActionPeso_>();
  public suinoSelected!: Suino;
  public addSuinoEvent = SuinoEvent.ADD_SUINO_EVENT;
  public editSuinoEvent = SuinoEvent.EDIT_SUINO_EVENT;
  public historicSuinoEvent = SuinoEvent.HISTORIC_SUINO_EVENT;


  handleSuinoEvent(action: string, id?: string): void{
    if(action && action !== ''){
      const suinoEventData= id && id !== '' ? {action, id} : {action}
      console.log("suinoEventData", suinoEventData)
      // EMITIR O VALOR DO EVENTO
      this.suinosEvent.emit(suinoEventData)
    }
  }
  handlePesoEvent(action: string, suino_id: string): void{
    if(suino_id && suino_id !== ' '){
      const pesoEventData= {action, suino_id}
      console.log("suinoEventDataPeso", pesoEventData)

      this.EventActionPeso.emit(pesoEventData)
    }
  }
  handleDeleteSuino(id: string, brincoSuino: string): void{
    if(id !== '' && brincoSuino !== ''){
      this.deletsuinosEvent.emit({id, brincoSuino});
    }
  }
}

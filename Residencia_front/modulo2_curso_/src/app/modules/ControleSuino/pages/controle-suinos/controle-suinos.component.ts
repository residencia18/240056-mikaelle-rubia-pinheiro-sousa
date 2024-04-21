import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventActon, controleSuino } from '../../../../models/enum/suino-enum';
import { Subject} from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ControleSuinoTableComponent } from '../../components/controle-suino-table/controle-suino-table.component';


@Component({
  selector: 'app-controle-suinos',
  templateUrl: './controle-suinos.component.html',
  styleUrl: './controle-suinos.component.css'
})
export class ControleSuinosComponent implements OnInit, OnDestroy {
  private readonly destroy$:Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  brincoSuino: Number =0

  constructor(private dialogService: DialogService,
    ){}


  ngOnInit(): void {

  }
  handleSessaoEvent(event: EventActon):void {
      if(event){
        this.brincoSuino = Number(event?.id)
        this.ref = this.dialogService.open(ControleSuinoTableComponent,{
          header: event?.action,
          width:'90%',
          contentStyle:{overflow: 'auto'},
          baseZIndex: 10000,
          maximizable: true,
          data:{
            event:event,
          }
        })
    }
  }



  ngOnDestroy(): void{
    this.destroy$.next();
    this.destroy$.complete();
  }

}

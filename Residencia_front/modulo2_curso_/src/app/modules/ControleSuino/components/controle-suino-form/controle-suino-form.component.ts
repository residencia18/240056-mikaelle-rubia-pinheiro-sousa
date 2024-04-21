import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuinoDataTransferService } from '../../../../shared/service/suinos/suino-data-transfer.service';
import { EventActon } from '../../../../models/enum/suino-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controle-suino-form',
  templateUrl: './controle-suino-form.component.html',
  styleUrls: ['./controle-suino-form.component.css']
})
export class ControleSuinoFormComponent {

  @Output() sessaoEvent =  new EventEmitter<EventActon>();

  public brinco_animais: Number[]=[]
  public brincoSelected: Number = 0


  public addBrincoForm: FormGroup;

  constructor(private suinoDtService: SuinoDataTransferService,
              private formBuilder: FormBuilder,
              private router: Router){

    this.addBrincoForm = this.formBuilder.group({
      brincoSelected: ['', { validators: [Validators.required], updateOn: 'blur' }],
    });
  }

  ngOnInit(): void {
    this.brinco_animais = this.suinoDtService.listBrinco;


  }
  handleBrincoId(action: string, id: Number) {
    action = action + id.toString()
    const sessaoDetalheEventData = { action, id: id.toString() };
    this.sessaoEvent.emit(sessaoDetalheEventData);
    console.log("Brinco selecionado", sessaoDetalheEventData);

  }

  navigateToRoute(tipoGrafico: string) {
    this.suinoDtService.grafico = tipoGrafico;
    this.router.navigate(['GraticosDetalhes']);
  }
}

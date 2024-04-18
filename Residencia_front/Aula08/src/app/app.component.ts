import { Component } from '@angular/core';
import { LogandoServiceService } from './logando-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Aula08';
  retorno: string = ""

  constructor(private logando:LogandoServiceService ){

  }
  ngOnInit() {

  this.retorno = this.logando.mostraTexto();

  }
}

import { Component } from '@angular/core';
import {NumeroAleatorioService } from './numero-aleatorio.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Aula10';
  numero = 0;
  valor: Subscription | undefined;

  constructor(private numerosAleatorio: NumeroAleatorioService){}

  GerarValor(){
    this.valor =this.numerosAleatorio.subject.subscribe(numero => {
      this.numero = numero;
    });
  }
}

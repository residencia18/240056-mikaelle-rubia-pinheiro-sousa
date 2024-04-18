import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VeiculosService } from '../../veiculos.service';

@Component({
  selector: 'app-arquivos-json',
  templateUrl: './arquivos-json.component.html',
  styleUrls: ['./arquivos-json.component.css']
})
export class ArquivosJsonComponent {
  @Output() sendValue: EventEmitter<any> = new EventEmitter();

  dadosCarregados: any = "";

  constructor(private http: HttpClient, private veiculos: VeiculosService) {}

  handleClick() {

    this.http.get('assets/veiculos.json').subscribe(
      (dados) => {
        this.veiculos.retornoJson = dados;
        this.sendValue.emit(this.veiculos.retornoJson);
      },
      (error) => {
        console.error('Erro ao carregar dados:', error);
        throw new Error('Resposta de rede não foi bem-sucedida');
      }
    );
  }
}

import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { VeiculosService } from '../../veiculos.service'


@Component({
  selector: 'app-busca-veiculos',
  templateUrl: './busca-veiculos.component.html',
  styleUrls: ['./busca-veiculos.component.css'] 
})
export class BuscaVeiculosComponent {
  @Output() sendCategoria: EventEmitter<any> = new EventEmitter();
  @Output() sendCaracter: EventEmitter<any> = new EventEmitter();

  listaBuscaVeiculos: any = "";
  categorias: any = "";
  titutoTop = "";
  style_: String = "";
  categoriaSelecionado: String = "";
  backgroundColor_ = "";
  padding_ = ""
  color_ = ""
  fontFamily_ = ""
  marginTop_ = ""
  border_ = ""
  display_ = " "
  resultadoBusca: any = "";
  textAlign_ ="";

  constructor( private veiculos: VeiculosService) {}


  buscarVeiculos(result: any) {
    this.resultadoBusca = result;

    this.categorias = Object.keys(result);
    this.titutoTop = "Categoria";
    this.backgroundColor_=  "rgb(237, 134, 96)";
    this.padding_ = "10px 10px"
    this.color_ = "#ffffff"

    this.border_ = "2px solid #60335d"
    this.display_ = "block"
    this.marginTop_ = "0"; 
    this.textAlign_ = "center";
    this.veiculos.retornoJson
    return result;
  }
  
  handleCategoriaClick(categoria: string) {
    this.sendCaracter.emit(categoria);
    this.sendCategoria.emit(this.resultadoBusca[categoria]);

  }


 
}

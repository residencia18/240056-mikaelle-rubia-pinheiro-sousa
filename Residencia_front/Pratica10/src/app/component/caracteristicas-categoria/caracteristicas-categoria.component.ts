import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-caracteristicas-categoria',
  templateUrl: './caracteristicas-categoria.component.html',
  styleUrls: ['./caracteristicas-categoria.component.css'] 
})
export class CaracteristicasCategoriaComponent {
  @Output() sendNome: EventEmitter<any> = new EventEmitter();
  @Output() sendObjetNome: EventEmitter<any> = new EventEmitter();
  resultadoCaracter: any[] = [];
  titutoTop: string = "";
  backgroundColor_ = "";
  padding_ = "";
  color_ = "";
  fontFamily_ = "";
  marginTop_ = "";
  border_ = "";
  borderRadius_ = "";
  display_ = "";
  textAlign_ = "";

  onSendCaracter(categoria: string) {
    this.titutoTop = categoria;
    this.backgroundColor_ = "rgb(237, 134, 96)";
    this.padding_ = "10px 12px";
    this.color_ = "#ffffff";
    this.fontFamily_ = "NomeDaFonte";
    this.border_ = "2px solid #60335d";
    this.borderRadius_ = "5px";
    this.display_ = "block";
    this.marginTop_ = "50px";
    this.textAlign_ = "center";
  }

  onSendCategoria(resultadoBusca: any) {
    this.resultadoCaracter = resultadoBusca;
  }

  handleNomeClick(Nome: any){
    this.sendNome.emit(Nome);
    this.sendObjetNome.emit(this.resultadoCaracter);
  }
}

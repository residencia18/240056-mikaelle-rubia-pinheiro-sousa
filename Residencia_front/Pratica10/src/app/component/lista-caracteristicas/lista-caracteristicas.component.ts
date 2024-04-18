import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lista-caracteristicas',
  templateUrl: './lista-caracteristicas.component.html',
  styleUrl: './lista-caracteristicas.component.css'
})
export class ListaCaracteristicasComponent {
  @Output() sendListaSalvar: EventEmitter<any> = new EventEmitter();
  listaValores: string [] = [];
  backgroundColor_ = "";
  padding_ = "";
  color_ = "";
  fontFamily_ = "";
  marginTop_ = "";
  border_ = "";
  borderRadius_ = "";
  display_ = "";
  textAlign_ = "";
  titulo_botao = "";
  padding_button =  "";
  marginTopButton_= ""
  backgroundColorButton_= ""

  listaCaracter(lista: any){

    this.padding_button ='10px 15px';
    this.marginTopButton_= '5px',
    this.backgroundColorButton_= 'rgb(237, 134, 96)'

    this.listaValores = []
    this.backgroundColor_ = "rgb(216, 100, 106)";
    this.padding_ = "100px";
    this.color_ = "#ffffff";
    this.fontFamily_ = "NomeDaFonte";
    this.border_ = "2px solid #60335d";
    this.display_ = "block";
    this.marginTop_ = "50px";
    this.textAlign_ = "center";
    this.titulo_botao =  "Adicionar"
    for(let i = 0; i <lista.length; i++){
      if (!this.listaValores.includes(lista[i])) {
        this.listaValores.push(lista[i]);
        
      } 
    }
  }

  salvarArquivo(){
    this.sendListaSalvar.emit(this.listaValores);
  }
}

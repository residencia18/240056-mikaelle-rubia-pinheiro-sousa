import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class LogandoServiceService {
  texto: string = "Mikaelle pinheiro";
  dadosCarregados: any = "";
  erroAoCarregarDados: any;
  constructor() {}

  mostraTexto(){
    console.log(this.texto)
    return this.texto;
    
  }



}

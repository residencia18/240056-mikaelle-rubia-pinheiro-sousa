import { Component } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-salvar-arquilojson',
  templateUrl: './salvar-arquilojson.component.html',
  styleUrl: './salvar-arquilojson.component.css'
})
export class SalvarArquilojsonComponent {
  padding_button =  "";
  marginTopButton_= ""
  backgroundColorButton_= ""  
  dadosAdicionados: string[] = [];


  salvaJson(listaJson: any){
    const dadosJson = JSON.stringify(listaJson, null, 2);
    const blob = new Blob([dadosJson], { type: 'application/json' });
    saveAs(blob);
  }
}

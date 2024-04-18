import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-valorbusca',
  templateUrl: './valorbusca.component.html',
  styleUrl: './valorbusca.component.css'
})
export class ValorbuscaComponent {
  @Output() sendValue: EventEmitter<any> = new EventEmitter();
  @ViewChild('buscaInput') buscaInput!: ElementRef;

  constructor() {}
  handleClick(){
    const valorDoInput = this.buscaInput.nativeElement.value;
    this.sendValue.emit(valorDoInput);
     return valorDoInput;
  
  }
}

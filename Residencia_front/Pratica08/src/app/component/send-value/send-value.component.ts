import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-send-value',
  templateUrl: './send-value.component.html',
  styleUrl: './send-value.component.css'
})
export class SendValueComponent {
  @Output() sendValue: EventEmitter<any> = new EventEmitter();
  @ViewChild('buscaInput') buscaInput!: ElementRef;

  constructor() {}
  handleClick(){
    const valorDoInput = this.buscaInput.nativeElement.value;
    this.sendValue.emit(valorDoInput);
     return valorDoInput;
  
  }
}

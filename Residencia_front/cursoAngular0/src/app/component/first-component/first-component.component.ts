import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrl: './first-component.component.css'
})
export class FirstComponentComponent {
  @Input() nome:string = "";
  car = {
    name: "polo",
    idade: 2020
  }
}

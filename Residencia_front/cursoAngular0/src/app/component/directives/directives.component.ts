import { Component, OnInit } from '@angular/core';
import { Animal } from '../../Animal';
@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrl: './directives.component.css'
})
export class DirectivesComponent implements OnInit  {
  animalDetail= '';
  animals:Animal[] = [
    {name: 'Turca', type:'Dog', age: 5},
    {name: 'Tom', type:'Dog', age: 1},
    {name: 'Frida', type:'Dog', age: 7},
    {name: 'Bob', type:'Cat', age: 6},
  ]
  size = 40;
  font =  'Ariel';
  color_ = 'red';
  ngOnInit() : void {}

  ShowAge(animal: Animal){
    this.animalDetail =  "O pet tem "+  animal.age + " anos."

  }

}

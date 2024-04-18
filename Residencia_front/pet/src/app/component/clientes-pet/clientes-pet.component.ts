import { Component, Input, OnInit } from '@angular/core';
import { Petshop } from '../../petshop.model';

@Component({
  selector: 'app-clientes-pet',
  templateUrl: './clientes-pet.component.html',
  styleUrl: './clientes-pet.component.css'
})
export class ClientesPetComponent {
  @Input() clientePetInput: Petshop[] = [];


}

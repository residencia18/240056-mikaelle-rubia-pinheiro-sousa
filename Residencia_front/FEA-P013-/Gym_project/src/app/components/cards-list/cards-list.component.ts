import { Component, Input, OnInit } from '@angular/core';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../types/location.interface';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.css'
})

export class CardsListComponent implements OnInit {
  @Input() unitsList: Location [] =[];

  constructor(){}
  ngOnInit(): void {
    console.log("aquiii",this.unitsList)
  }

}

import { Component } from '@angular/core';
import { Location } from '../../types/location.interface';
import { BehaviorSubject } from 'rxjs';
import { GetUnitsService } from '../../services/get-units.service';

import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FormsComponent } from '../forms/forms.component';
import { CardsListComponent } from '../cards-list/cards-list.component';
import { CommonModule } from '@angular/common';
import { LegendComponent } from '../legend/legend.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-page-form',
  standalone: true,
  imports: [RouterOutlet,
    HeaderComponent,
    FormsComponent,
    CardsListComponent,
    CommonModule,
    LegendComponent,
    FooterComponent,
    LoginComponent],
  templateUrl: './page-form.component.html',
  styleUrl: './page-form.component.css'
})
export class PageFormComponent {
  showList = new BehaviorSubject(false);
  unitsList: Location[]=[];

  constructor(private getUnitsService: GetUnitsService){}

  onSubmite(){

    this.unitsList = this.getUnitsService.getFilteredUnits();
    this.showList.next(true);
  }
}

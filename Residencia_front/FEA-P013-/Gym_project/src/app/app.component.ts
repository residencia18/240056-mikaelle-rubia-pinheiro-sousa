import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FormsComponent } from './components/forms/forms.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { CommonModule } from '@angular/common';
import { GetUnitsService } from './services/get-units.service';
import { Location } from './types/location.interface';
import { LegendComponent } from './components/legend/legend.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from "./components/login/login.component";
import { CreateUnitComponent } from './components/create-unit/create-unit.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CreateUnitComponent, RouterOutlet, HeaderComponent, FormsComponent, CardsListComponent, CommonModule, LegendComponent, FooterComponent, LoginComponent]
})
export class AppComponent {
  showList = new BehaviorSubject(false);
  unitsList: Location[]=[];

  constructor(private getUnitsService: GetUnitsService){}

  onSubmite(){

    this.unitsList = this.getUnitsService.getFilteredUnits();
    this.showList.next(true);
  }
}

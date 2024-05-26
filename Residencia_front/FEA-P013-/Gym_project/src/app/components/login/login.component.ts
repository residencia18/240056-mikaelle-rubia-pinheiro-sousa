import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsComponent } from '../forms/forms.component';
import { CardsListComponent } from '../cards-list/cards-list.component';
import { CommonModule } from '@angular/common';
import { LegendComponent } from '../legend/legend.component';
import { FooterComponent } from '../footer/footer.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ HeaderComponent, FormsComponent, CardsListComponent, CommonModule, LegendComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}

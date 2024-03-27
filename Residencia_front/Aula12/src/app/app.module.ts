import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosFormularioComponent } from './eventos-formulario/eventos-formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RotasComponent } from './rotas/rotas.component';

const rotasApp: Routes = [
  {path: 'formulario', component:  EventosFormularioComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    EventosFormularioComponent,
    RotasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(rotasApp)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

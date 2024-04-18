import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WikimediaComponent } from './component/wikimedia/wikimedia.component';
import { ValorbuscaComponent } from './component/valorbusca/valorbusca.component';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, Routes } from '@angular/router';


const rotasApp: Routes = [
  {path: 'busca', component: WikimediaComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    WikimediaComponent,
    ValorbuscaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(rotasApp)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

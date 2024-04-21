import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './modules/home/home.component';
import { CardModule} from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import{AngularFireModule} from '@angular/fire/compat';
import{AngularFireAuthModule} from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { GraficosDetalhesAnimaisComponent } from './modules/graficos-detalhes-animais/graficos-detalhes-animais.component';
import { GraticosDetalhesAnimaisHomeComponent } from './modules/GraficosDetalhesAnimais/pages/graticos-detalhes-animais-home/graticos-detalhes-animais-home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GraficosDetalhesAnimaisComponent,
    GraticosDetalhesAnimaisHomeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //PRIMENG
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)

  ],
  providers: [CookieService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

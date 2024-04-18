import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioPetComponent } from './component/formulario-pet/formulario-pet.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticaInterceptor } from './autentica.interceptor';
import { EspionandoInterceptor } from './espionando.interceptor';
import {environment} from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { OauthComponent } from './component/oauth/oauth.component';
import { HomeComponent } from './component/home/home.component';
import { ClientesPetComponent } from './component/clientes-pet/clientes-pet.component'
const routes: Routes =[
  { path: '', component: HomeComponent },
  { path: 'formularioPet', component: FormularioPetComponent },
  { path: 'editarCliente', component: FormularioPetComponent },


]
@NgModule({
  declarations: [
    AppComponent,
    FormularioPetComponent,
    OauthComponent,
    HomeComponent,
    ClientesPetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule, provideFirebaseApp(() => initializeApp({"projectId":"residenciaaula13","appId":"1:606592010453:web:6bd900100bbe7055e1ba5c","databaseURL":"https://residenciaaula13-default-rtdb.firebaseio.com","storageBucket":"residenciaaula13.appspot.com","apiKey":"AIzaSyBknFkcrKz55C2om1BdX5PdUXOhpfZ5lrk","authDomain":"residenciaaula13.firebaseapp.com","messagingSenderId":"606592010453","measurementId":"G-MGBJSET593"})), provideFirestore(() => getFirestore())

  ],
  providers: [
    //ordem de execução dos interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticaInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EspionandoInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

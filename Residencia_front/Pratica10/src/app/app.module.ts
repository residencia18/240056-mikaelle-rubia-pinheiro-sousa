import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BuscaVeiculosComponent } from './component/busca-veiculos/busca-veiculos.component';
import { CategoriaEscolhidaComponent } from './component/categoria-escolhida/categoria-escolhida.component';
import { CaracteristicasCategoriaComponent } from './component/caracteristicas-categoria/caracteristicas-categoria.component';
import { ListaCaracteristicasComponent } from './component/lista-caracteristicas/lista-caracteristicas.component';
import { ArquivosJsonComponent } from './component/arquivos-json/arquivos-json.component';
import { SalvarArquilojsonComponent } from './component/salvar-arquilojson/salvar-arquilojson.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscaVeiculosComponent,
    CategoriaEscolhidaComponent,
    CaracteristicasCategoriaComponent,
    ListaCaracteristicasComponent,
    ArquivosJsonComponent,
    SalvarArquilojsonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

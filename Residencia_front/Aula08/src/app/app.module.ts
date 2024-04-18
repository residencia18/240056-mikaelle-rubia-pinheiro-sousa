import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PipeTestePipe } from './pipe-teste.pipe';
import { TestePipeComponent } from './teste-pipe/teste-pipe.component';


@NgModule({
  declarations: [
    AppComponent,
    PipeTestePipe,
    TestePipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

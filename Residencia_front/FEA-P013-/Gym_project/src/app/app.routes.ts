import { Routes } from '@angular/router';
import { CreateUnitComponent } from './components/create-unit/create-unit.component';
import { PageFormComponent } from './components/page-form/page-form.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardsService } from './guards/auth-guards.service';

export const routes: Routes = [

  { path: '', component:  HomeComponent
},
  { path: 'home', component:  HomeComponent},

  { path: 'getUnits/:id_delet', component: PageFormComponent ,
  canActivate:[AuthGuardsService]},

  { path: 'getUnits', component:  PageFormComponent,
  canActivate:[AuthGuardsService]},

  { path: 'createUnitComponent/:id', component: CreateUnitComponent ,
  canActivate:[AuthGuardsService]},

  { path: 'createUnitComponent', component: CreateUnitComponent ,
  canActivate:[AuthGuardsService]},
];

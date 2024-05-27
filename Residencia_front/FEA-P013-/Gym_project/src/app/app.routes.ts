import { Routes } from '@angular/router';
import { CreateUnitComponent } from './components/create-unit/create-unit.component';
import { PageFormComponent } from './components/page-form/page-form.component';

export const routes: Routes = [

  { path: 'dashboard', component:  PageFormComponent},
  { path: 'getUnits/:id_delet', component: PageFormComponent },
  { path: 'getUnits', component:  PageFormComponent },
  { path: 'createUnitComponent/:id', component: CreateUnitComponent },
  { path: 'createUnitComponent', component: CreateUnitComponent },
];

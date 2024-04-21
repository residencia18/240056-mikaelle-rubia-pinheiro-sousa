import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuardsService } from './guards/auth-guards.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch:'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    loadChildren:()=>
    import('./modules/dashboard/dashboard.module').then(
      (m)=>m.DashboardModule
    ),
    canActivate:[AuthGuardsService]
  },
  {
    path:'suino',
    loadChildren:()=>
    import('./modules/suinos/suinos.module').then(
      (m)=>m.SuinosModule
    ),
    canActivate:[AuthGuardsService]
  },
  {
    path:'historico',
    loadChildren:()=>
    import('./modules/HistoricoPesoSuino/historico-peso.module').then(
      (m)=>m.HistoricoPesoModule
    ),
    canActivate:[AuthGuardsService]
  },
  {
    path:'sessao',
    loadChildren:()=>
    import('./modules/sessao/sessao.module').then(
      (m)=>m.SessaoModule
    ),
    canActivate:[AuthGuardsService]
  },
  {
    path:'detalhesSessao',
    loadChildren:()=>
    import('./modules/DetalhesSessão/detalhes-sessao.module').then(
      (m)=>m.DetalhesSessaoModule
    ),
    canActivate:[AuthGuardsService]
  },
  {
    path:'historicoSessao',
    loadChildren:()=>
    import('./modules/HistoricoSessoesAnimal/historico-sessoes-animal.module').then(
      (m)=>m.HistoricoSessoesAnimalModule
    ),
    canActivate:[AuthGuardsService]
  },
  {
    path:'controleoAnimal',
    loadChildren:()=>
    import('./modules/ControleSuino/controle-suino.module').then(
      (m)=>m.ControleSuinoModule
    ),
    canActivate:[AuthGuardsService]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

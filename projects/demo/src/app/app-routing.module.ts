
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
         LcuFathymForecastFathymForecastElementComponent,
         LcuFathymForecastRoutingElementComponent, 
         RouterGuard} from '@habistack/lcu-fathym-forecast-common';

const routes: Routes = [
  {
    path: '', redirectTo: 'page-route', pathMatch: 'full'
  },
  {
    path: 'page-route',
    component: LcuFathymForecastRoutingElementComponent
  },
  {
    path: 'page-route/:route',
    component: LcuFathymForecastRoutingElementComponent,
    canActivate: [RouterGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

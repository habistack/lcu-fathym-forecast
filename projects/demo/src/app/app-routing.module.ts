
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  LcuFathymForecastApiKeysElementComponent,
         LcuFathymForecastFathymForecastElementComponent,
         LcuFathymForecastRoutingElementComponent, 
         RouterGuard} from '@habistack/lcu-fathym-forecast-common';

const routes: Routes = [
  // {
  //   path: 'page-route',
  //   component: LcuFathymForecastRoutingElementComponent
  // },
  // {
  //   path: '', redirectTo: 'page-route', pathMatch: 'full'
  // },
  // {
  //   path: 'page-route/:route',
  //   component: LcuFathymForecastRoutingElementComponent,
  //   canActivate: [RouterGuard]
  // },
  {
    path: 'api-keys',
    component: LcuFathymForecastApiKeysElementComponent
  },
  {
    path: 'demo',
    component: LcuFathymForecastFathymForecastElementComponent
  },
  {
    path: '', redirectTo: 'api-keys', pathMatch: 'full'
  },
  {
    path: '**', redirectTo: 'api-keys', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

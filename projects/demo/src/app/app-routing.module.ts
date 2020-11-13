
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
         LcuFathymForecastFathymForecastElementComponent,
         LcuFathymForecastRoutingElementComponent } from '@habistack/lcu-fathym-forecast-common';

const routes: Routes = [
  // { path: '', redirectTo: 'page-route/api', pathMatch: 'full'},
  // { path: 'page-route/api',
  //   component: LcuFathymForecastRoutingElementComponent
  // },
  // { path: 'page-route/:route',
  //   component: LcuFathymForecastRoutingElementComponent
  // },
  // { path: 'route-search',
  //   component: LcuFathymForecastFathymForecastElementComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

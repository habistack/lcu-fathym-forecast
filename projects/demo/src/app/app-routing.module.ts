import { RouterGuard } from './../../../common/src/lib/guards/router.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
         LcuFathymForecastFathymForecastElementComponent,
         LcuFathymForecastRoutingElementComponent } from '@habistack/lcu-fathym-forecast-common';

const routes: Routes = [
  { path: '', redirectTo: 'page-route', pathMatch: 'full'},
  { path: 'page-route', 
    component: LcuFathymForecastRoutingElementComponent
  },
  { path: 'page-route/:page',
    component: LcuFathymForecastRoutingElementComponent,
    canActivate: [RouterGuard]
  },
  { path: 'route-search',
    component: LcuFathymForecastFathymForecastElementComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

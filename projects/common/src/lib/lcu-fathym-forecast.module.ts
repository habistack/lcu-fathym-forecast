import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridModule } from '@lowcodeunit/data-grid';
import { DepartureTableComponent } from './departure-table/departure-table.component';



@NgModule({
  declarations: [
    DepartureTableComponent,
  ],
  imports: [
    CommonModule,
    DataGridModule,  
  ],
  exports: [
    DepartureTableComponent,
    DataGridModule
  ],
  entryComponents: [
    DepartureTableComponent,
  ]
})
export class LcuFathymForecastModule { }

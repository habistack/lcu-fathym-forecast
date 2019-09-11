import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AmModule } from '@acaisoft/angular-azure-maps';
import { NvD3Module } from 'ng2-nvd3';

import 'd3';
import 'nvd3';

import { DataGridModule } from '@lowcodeunit/data-grid';
import { DisplayDateFormatPipe, ImageDateFormatPipe } from './utils/pipes/wc-pipes';
import { FathymSharedModule, MaterialModule } from '@lcu-ide/common';
import { LcuSelectModule } from '@lowcodeunit/lcu-select-common';
import { DepartureTableComponent } from './controls/departure-table/departure-table.component';
import { SearchFormComponent } from './controls/search-form/search-form.component';
import { RouteMapComponent } from './controls/route-map/route-map.component';
import { ForecastDataPlotComponent } from './controls/forecast-data-plot/forecast-data-plot.component';
import { VariableDataPlotComponent } from './controls/variable-data-plot/variable-data-plot.component';
import { ForecastPlotsComponent } from './controls/forecast-plots/forecast-plots.component';

@NgModule({
  declarations: [
    DepartureTableComponent,
    SearchFormComponent,
    RouteMapComponent,
    ForecastDataPlotComponent,
    DisplayDateFormatPipe,
    ImageDateFormatPipe,
    VariableDataPlotComponent,
    ForecastPlotsComponent,
    ForecastDataPlotComponent
  ],
  imports: [
    CommonModule,
    DataGridModule,
    FathymSharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LcuSelectModule,
    ToastrModule.forRoot(),
    AmModule,
    FlexLayoutModule,
    NvD3Module
  ],
  exports: [
    DepartureTableComponent,
    RouteMapComponent,
    DataGridModule,
    SearchFormComponent,
    DisplayDateFormatPipe,
    ImageDateFormatPipe,
    ForecastDataPlotComponent,
    VariableDataPlotComponent,
    ForecastPlotsComponent,
    ForecastDataPlotComponent
  ],
  entryComponents: [
    DepartureTableComponent,
    SearchFormComponent,
    RouteMapComponent,
    ForecastDataPlotComponent,
    VariableDataPlotComponent,
    ForecastPlotsComponent,
    ForecastDataPlotComponent
  ],
  providers: [
    DisplayDateFormatPipe,
    ImageDateFormatPipe
  ]
})
export class LcuFathymForecastModule {
  // static forRoot(): LcuFathymForecastModule {
  //   return {
  //     ngModule: LcuFathymForecastModule,
  //     providers: [DisplayDateFormatPipe, ImageDateFormatPipe]
  //   };
  // }
 }

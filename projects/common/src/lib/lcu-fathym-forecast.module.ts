import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataGridModule } from '@lowcodeunit/data-grid';
import { ToastrModule } from 'ngx-toastr';
import { AmModule } from '@acaisoft/angular-azure-maps';
import { DisplayDateFormatPipe, ImageDateFormatPipe } from './utils/pipes/wc-pipes';
import { FathymSharedModule, MaterialModule } from '@lcu-ide/common';
import { LcuSelectModule } from '@lowcodeunit/lcu-select-common';
import { DepartureTableComponent } from './controls/departure-table/departure-table.component';
import { SearchFormComponent } from './controls/search-form/search-form.component';
import { RouteMapComponent } from './controls/route-map/route-map.component';
import { ForecastPlotComponent } from './controls/forecast-plot/forecast-plot.component';
import { IrradiancePlot } from './controls/plots/irradiance-plot/irradiance-plot';
import { NumericPlot } from './controls/plots/numeric-plot/numeric-plot';
import { PotentialDelayRiskPlot } from './controls/plots/potential-delay-risk-plot/potential-delay-risk-plot';
import { PotentialRoadStatePlot } from './controls/plots/potential-road-state_plot/potential-road-state-plot';
import { PrecipitationPlot } from './controls/plots/precipitation-plot/precipitation-plot';
import { SnowDepthPlot } from './controls/plots/snow-depth-plot/snow-depth-plot';
import { TemperaturePlot } from './controls/plots/temperature-plot/temperature-plot';
import { WindPlot } from './controls/plots/wind-plot/wind-plot';
import { ElevationPlot } from './controls/plots/elevation-plot/elevation-plot';
import { CrosswindPlot } from './controls/plots/crosswind-plot/crosswind-plot';
import { CloudCoverPlot } from './controls/plots/cloud-cover-plot/cloud-cover-plot';

@NgModule({
  declarations: [
    DepartureTableComponent,
    SearchFormComponent,
    RouteMapComponent,
    ForecastPlotComponent,
    DisplayDateFormatPipe,
    ImageDateFormatPipe,
    CloudCoverPlot,
    CrosswindPlot,
    ElevationPlot,
    IrradiancePlot,
    NumericPlot,
    PotentialDelayRiskPlot,
    PotentialRoadStatePlot,
    PrecipitationPlot,
    SnowDepthPlot,
    TemperaturePlot,
    WindPlot
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
    FlexLayoutModule
  ],
  exports: [
    DepartureTableComponent,
    RouteMapComponent,
    DataGridModule,
    SearchFormComponent,
    DisplayDateFormatPipe,
    ImageDateFormatPipe,
    ForecastPlotComponent
  ],
  entryComponents: [
    DepartureTableComponent,
    SearchFormComponent,
    RouteMapComponent,
    ForecastPlotComponent
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

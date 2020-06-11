import { LcuFathymForecastRoutingElementComponent } from './elements/routing/routing.component';
// import { LoadMapService } from '@lowcodeunit/lcu-maps-common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import 'd3';

import { DataGridModule } from '@lowcodeunit/data-grid';
import { DisplayDateFormatPipe, ImageDateFormatPipe } from './utils/pipes/ff-pipes';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { LcuSelectModule } from '@lowcodeunit/lcu-select-common';
import { DepartureTableComponent } from './controls/departure-table/departure-table.component';
import { SearchFormComponent } from './controls/search-form/search-form.component';
import { RouteMapComponent } from './controls/route-map/route-map.component';
import { ForecastDataPlotComponent } from './controls/forecast-data-plot/forecast-data-plot.component';
import { VariableDataPlotComponent } from './controls/variable-data-plot/variable-data-plot.component';
import { ForecastPlotsComponent } from './controls/forecast-plots/forecast-plots.component';
import { RouteSummarizationComponent } from './controls/route-summarization/route-summarization.component';
import { ForecastDetailsComponent } from './controls/forecast-details/forecast-details.component';
import { LcuFathymForecastFathymForecastElementComponent } from './elements/fathym-forecast/fathym-forecast.component';
import { LcuChartsModule} from '@lowcodeunit/lcu-charts-common';
import { ChartPlotsComponent } from './controls/chart-plots/chart-plots.component';
import { LcuFathymForecastApiKeysElementComponent } from './elements/api-keys/api-keys.component';
import { LcuFathymForecastAnalyticsElementComponent } from './elements/analytics/analytics.component';

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
    ForecastDataPlotComponent,
    RouteSummarizationComponent,
    ForecastDetailsComponent,
    LcuFathymForecastFathymForecastElementComponent,
    ChartPlotsComponent,
    LcuFathymForecastApiKeysElementComponent,
    LcuFathymForecastAnalyticsElementComponent,
    LcuFathymForecastRoutingElementComponent
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
    FlexLayoutModule,
    LcuChartsModule,
    // LcuMapsModule.forRoot()
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
    ForecastDataPlotComponent,
    RouteSummarizationComponent,
    LcuFathymForecastFathymForecastElementComponent,
    LcuFathymForecastApiKeysElementComponent,
    LcuFathymForecastAnalyticsElementComponent,
    LcuFathymForecastRoutingElementComponent,
    // LcuMapsModule
  ],
  entryComponents: [
    DepartureTableComponent,
    SearchFormComponent,
    RouteMapComponent,
    ForecastDataPlotComponent,
    VariableDataPlotComponent,
    ForecastPlotsComponent,
    ForecastDataPlotComponent,
    ForecastDetailsComponent,
    LcuFathymForecastFathymForecastElementComponent,
    LcuFathymForecastApiKeysElementComponent,
    LcuFathymForecastAnalyticsElementComponent,
    LcuFathymForecastRoutingElementComponent
  ],
  providers: [
    DisplayDateFormatPipe,
    ImageDateFormatPipe
  ]
})
export class LcuFathymForecastModule {
  static forRoot(): ModuleWithProviders<LcuFathymForecastModule> {
    return {
      ngModule: LcuFathymForecastModule,
      // providers: [LoadMapService]
    };
  }
 }

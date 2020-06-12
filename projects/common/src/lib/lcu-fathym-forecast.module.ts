<<<<<<< HEAD
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { DataGridModule } from '@lowcodeunit/data-grid';
import { LcuChartsModule } from '@lowcodeunit/lcu-charts-common';
import { LcuSelectModule } from '@lowcodeunit/lcu-select-common';
import { LoadMapService } from '@acaisoft/angular-azure-maps';
import { ToastrModule } from 'ngx-toastr';
import { LcuFathymForecastApiKeysElementComponent } from './elements/api-keys/api-keys.component';
import { FathymForecastStateContext } from './state/fathym-forecast/fathym-forecast-state.context';
import { LcuFathymForecastRoutingElementComponent } from './elements/routing/routing.component';
import { DepartureTableComponent } from './controls/departure-table/departure-table.component';
import { RouteMapComponent } from './controls/route-map/route-map.component';
import { SearchFormComponent } from './controls/search-form/search-form.component';
import { ForecastDataPlotComponent } from './controls/forecast-data-plot/forecast-data-plot.component';
import { VariableDataPlotComponent } from './controls/variable-data-plot/variable-data-plot.component';
import { ForecastPlotsComponent } from './controls/forecast-plots/forecast-plots.component';
import { RouteSummarizationComponent } from './controls/route-summarization/route-summarization.component';
import { DisplayDateFormatPipe, ImageDateFormatPipe } from './utils/pipes/ff-pipes';
import { ForecastDetailsComponent } from './controls/forecast-details/forecast-details.component';
import { ChartPlotsComponent } from './controls/chart-plots/chart-plots.component';

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
    ChartPlotsComponent,
    ForecastDetailsComponent,
    LcuFathymForecastApiKeysElementComponent,
    LcuFathymForecastRoutingElementComponent,
  ],
  imports: [
    FathymSharedModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    DataGridModule,
    LcuSelectModule,
    ToastrModule.forRoot(),
    // AmModule,
    LcuChartsModule
  ],
  exports: [
    DepartureTableComponent,
    RouteMapComponent,
    DataGridModule,
    SearchFormComponent,
    DisplayDateFormatPipe,
    ImageDateFormatPipe,
    ForecastDetailsComponent,
    ForecastDataPlotComponent,
    VariableDataPlotComponent,
    ForecastPlotsComponent,
    ForecastDataPlotComponent,
    ChartPlotsComponent,
    RouteSummarizationComponent,
    LcuFathymForecastApiKeysElementComponent,
    LcuFathymForecastRoutingElementComponent,
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
    ChartPlotsComponent,
    LcuFathymForecastApiKeysElementComponent,
    LcuFathymForecastRoutingElementComponent,
  ],
  providers: [
    DisplayDateFormatPipe,
    ImageDateFormatPipe,
    LoadMapService,
  ],
})
export class LcuFathymForecastModule {
  static forRoot(): ModuleWithProviders<LcuFathymForecastModule> {
    return {
      ngModule: LcuFathymForecastModule,
      providers: [FathymForecastStateContext],
    };
  }
}
=======
import { LcuFathymForecastRoutingElementComponent } from './elements/routing/routing.component';
import { LoadMapService, LcuMapsModule } from '@lowcodeunit/lcu-maps-common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import 'd3';

import { DataGridModule } from '@lowcodeunit/data-grid';
import { DisplayDateFormatPipe, ImageDateFormatPipe } from './utils/pipes/ff-pipes';
import { FathymSharedModule, MaterialModule, DirectiveModule } from '@lcu/common';
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
    LcuMapsModule.forRoot(),
    DirectiveModule
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
    LcuMapsModule,
    DirectiveModule
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
      providers: [LoadMapService]
    };
  }
<<<<<<< HEAD
 }
>>>>>>> integration
=======
 }
>>>>>>> integration

import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { LcuSelectModule } from '@lowcodeunit/lcu-select-common';
import { ToastrModule } from 'ngx-toastr';
import { LcuFathymForecastApiKeysElementComponent } from './elements/api-keys/api-keys.component';
import { FathymForecastStateContext } from './state/fathym-forecast/fathym-forecast-state.context';
import { LcuFathymForecastRoutingElementComponent } from './elements/routing/routing.component';
import { DepartureTableComponent } from './controls/departure-table/departure-table.component';
import { RouteMapComponent } from './controls/route-map/route-map.component';
import { DataGridModule } from '@lowcodeunit/data-grid';
import { SearchFormComponent } from './controls/search-form/search-form.component';
import { ForecastDataPlotComponent } from './controls/forecast-data-plot/forecast-data-plot.component';
import { VariableDataPlotComponent } from './controls/variable-data-plot/variable-data-plot.component';
import { ForecastPlotsComponent } from './controls/forecast-plots/forecast-plots.component';
import { RouteSummarizationComponent } from './controls/route-summarization/route-summarization.component';
import { DisplayDateFormatPipe, ImageDateFormatPipe } from './utils/pipes/ff-pipes';
import { ForecastDetailsComponent } from './controls/forecast-details/forecast-details.component';
import { ChartPlotsComponent } from './controls/chart-plots/chart-plots.component';
import { LcuChartsModule } from '@lowcodeunit/lcu-charts-common';

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
    ImageDateFormatPipe
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

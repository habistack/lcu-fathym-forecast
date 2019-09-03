import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataGridModule } from '@lowcodeunit/data-grid';
import { DisplayDateFormatPipe, ImageDateFormatPipe } from './utils/pipes/wc-pipes';
import { FathymSharedModule, MaterialModule } from '@lcu-ide/common';
import { LcuSelectModule } from '@lowcodeunit/lcu-select-common';
import { ToastrModule } from 'ngx-toastr';
import { DepartureTableComponent } from './controls/departure-table/departure-table.component';
import { SearchFormComponent } from './controls/search-form/search-form.component';
import { RouteMapComponent } from './controls/route-map/route-map.component';
import { LoadMapService, AmModule } from '@acaisoft/angular-azure-maps';
import { ToggleThemeUtil } from './utils/toggle-theme.utils';

@NgModule({
  declarations: [
    DepartureTableComponent,
    SearchFormComponent,
    RouteMapComponent,
    DisplayDateFormatPipe,
    ImageDateFormatPipe
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
    AmModule
  ],
  exports: [
    DepartureTableComponent,
    RouteMapComponent,
    DataGridModule,
    SearchFormComponent,
    DisplayDateFormatPipe,
    ImageDateFormatPipe
  ],
  entryComponents: [
    DepartureTableComponent,
    SearchFormComponent,
    RouteMapComponent
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

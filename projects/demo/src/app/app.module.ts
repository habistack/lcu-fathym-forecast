import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataGridModule } from '@lowcodeunit/data-grid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FathymSharedModule, MaterialModule } from '@lcu-ide/common';
import { SelectComponent } from '@lowcodeunit/lcu-select-common';
import { LoadMapService, AtlasMapComponent } from '@acaisoft/angular-azure-maps';
import { ToastrModule } from 'ngx-toastr';
import {
  DepartureTableComponent,
  SearchFormComponent,
  DisplayDateFormatPipe,
  ImageDateFormatPipe,
  RouteMapComponent
 } from '@lowcodeunit/lcu-fathym-forecast-common';
 

@NgModule({
  declarations: [
    AppComponent,
    DepartureTableComponent,
    SearchFormComponent,
    SelectComponent,
    RouteMapComponent,
    AtlasMapComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    DataGridModule,
    FlexLayoutModule,
    FathymSharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    DisplayDateFormatPipe,
    ImageDateFormatPipe,
    LoadMapService
],
  bootstrap: [AppComponent]
})
export class AppModule { }

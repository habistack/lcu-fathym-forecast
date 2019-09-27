import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FathymSharedModule, MaterialModule } from '@lcu/common';
// import { LoadMapService, AtlasMapComponent } from '@acaisoft/angular-azure-maps';
import { ToastrModule } from 'ngx-toastr';
import {
  DisplayDateFormatPipe,
  ImageDateFormatPipe,
  LcuFathymForecastModule
 } from '@habistack/lcu-fathym-forecast-common';
import { AmModule, LoadMapService } from '@acaisoft/angular-azure-maps';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    FathymSharedModule,
    LcuFathymForecastModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    AmModule
  ],
  providers: [
    DisplayDateFormatPipe,
    ImageDateFormatPipe,
    LoadMapService
],
  bootstrap: [AppComponent]
})
export class AppModule { }

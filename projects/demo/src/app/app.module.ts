import { LazyElementModule } from '@lowcodeunit/lazy-element';
import { HomeComponent } from './controls/home/home.component';
import { DocumentationComponent } from './controls/documentation/documentation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FathymSharedModule, MaterialModule, LCUServiceSettings, DirectiveModule } from '@lcu/common';
// import { LoadMapService, AtlasMapComponent } from '@acaisoft/angular-azure-maps';
import { ToastrModule } from 'ngx-toastr';
import {
  DisplayDateFormatPipe,
  ImageDateFormatPipe,
  LcuFathymForecastModule
 } from '@habistack/lcu-fathym-forecast-common';
// import { AmModule, LoadMapService } from '@acaisoft/angular-azure-maps';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DocumentationComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    FathymSharedModule,
    LcuFathymForecastModule.forRoot(environment),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    LazyElementModule.forRoot()
  ],
  providers: [
    DisplayDateFormatPipe,
    ImageDateFormatPipe,
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment)
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
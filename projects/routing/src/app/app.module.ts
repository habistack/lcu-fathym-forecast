<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {
  FathymSharedModule,
  MaterialModule,
  LCUServiceSettings,
} from '@lcu/common';
import { AppComponent } from './app.component';
import { LcuDocumentationModule } from '@lowcodeunit/lcu-documentation-common';
import {
  LcuFathymForecastModule,
  FathymForecastStateContext,
} from '@habistack/lcu-fathym-forecast-common';
import { environment } from '../environments/environment';
import { LazyElementModule } from '@lowcodeunit/lazy-element';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule,
    LazyElementModule,
    LcuDocumentationModule.forRoot(),
    LcuFathymForecastModule.forRoot(),
  ],
  providers: [
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment),
    },
  ],
  bootstrap: [AppComponent],
  exports: [LcuFathymForecastModule],
})
export class AppModule {}
=======
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
>>>>>>> integration

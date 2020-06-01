import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule, LCUServiceSettings } from '@lcu/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './controls/home/home.component';
import { DocumentationComponent } from './controls/documentation/documentation.component';
import { LcuDocumentationModule } from '@lowcodeunit/lcu-documentation-common';
import { LcuFathymForecastModule, FathymForecastStateContext } from '@habistack/lcu-fathym-forecast-common';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, HomeComponent, DocumentationComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule,
    MaterialModule,
    FlexLayoutModule,
    LcuDocumentationModule.forRoot(),
    // LcuFathymForecastModule.forRoot(),
  ],
  providers: [
    FathymForecastStateContext,
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment),
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
  // exports: [LcuFathymForecastModule],
})
export class AppModule {}

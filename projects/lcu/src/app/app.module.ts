import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { FathymSharedModule, LCUServiceSettings, MaterialModule } from '@lcu/common';
import {
  LcuFathymForecastModule,
  LcuFathymForecastFathymForecastElementComponent,
  SelectorLcuFathymForecastFathymForecastElement,
  LcuFathymForecastApiKeysElementComponent,
  SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT,
  LcuFathymForecastAnalyticsElementComponent,
  SELECTOR_LCU_FATHYM_FORECAST_ANALYTICS_ELEMENT,
  DisplayDateFormatPipe,
  ImageDateFormatPipe,
} from '@habistack/lcu-fathym-forecast-common';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LazyElementModule } from '@lowcodeunit/lazy-element';

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
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
      useValue: FathymSharedModule.DefaultServiceSettings(environment),
    },
  ],
  exports: [LcuFathymForecastModule],
})
export class AppModule implements DoBootstrap {
  //  Constructors
  constructor(protected injector: Injector) {}

  //  Life Cycle
  public ngDoBootstrap() {
    const cfgMgr = createCustomElement(
      LcuFathymForecastFathymForecastElementComponent,
      { injector: this.injector }
    );

    customElements.define(
      SelectorLcuFathymForecastFathymForecastElement,
      cfgMgr
    );

    const apiKeys = createCustomElement(
      LcuFathymForecastApiKeysElementComponent,
      { injector: this.injector }
    );

    customElements.define(
      SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT,
      apiKeys
    );

    const analytics = createCustomElement(
      LcuFathymForecastAnalyticsElementComponent,
      { injector: this.injector }
    );

    customElements.define(
      SELECTOR_LCU_FATHYM_FORECAST_ANALYTICS_ELEMENT,
      analytics
    );
  }
}

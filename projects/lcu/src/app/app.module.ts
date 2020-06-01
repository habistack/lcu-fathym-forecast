import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FathymSharedModule, LCUServiceSettings } from '@lcu/common';
import { environment } from '../environments/environment';
import {
  LcuFathymForecastModule,
  LcuFathymForecastRoutingElementComponent,
  SELECTOR_LCU_FATHYM_FORECAST_ROUTING_ELEMENT,
  LcuFathymForecastApiKeysElementComponent,
  SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT,
  LcuFathymForecastAnalyticsElementComponent,
  SELECTOR_LCU_FATHYM_FORECAST_ANALYTICS_ELEMENT,
} from '@habistack/lcu-fathym-forecast-common';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule,
    LcuFathymForecastModule.forRoot(),
  ],
  providers: [
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment),
    },
  ],
  exports: [LcuFathymForecastModule],
})
export class AppModule implements DoBootstrap {
  constructor(protected injector: Injector) {}

  public ngDoBootstrap() {
    const routing = createCustomElement(
      LcuFathymForecastRoutingElementComponent,
      { injector: this.injector }
    );

    customElements.define(
      SELECTOR_LCU_FATHYM_FORECAST_ROUTING_ELEMENT,
      routing
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

import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FathymSharedModule, LCUServiceSettings } from '@lcu/common';
import { environment } from '../environments/environment';
import {
  LcuFathymForecastModule,
  LcuFathymForecastApiKeysElementComponent,
  SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT,
  FathymForecastStateContext,
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
    FathymForecastStateContext,
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
    const apiKeys = createCustomElement(
      LcuFathymForecastApiKeysElementComponent,
      { injector: this.injector }
    );

    customElements.define(
      SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT,
      apiKeys
    );
  }
}

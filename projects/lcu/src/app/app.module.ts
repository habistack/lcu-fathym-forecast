import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { FathymSharedModule, LCUServiceSettings } from '@lcu/common';
import { environment } from '../environments/environment';
import {
  LcuFathymForecastModule,
  LcuFathymForecastFathymForecastElementComponent,
  SelectorLcuFathymForecastFathymForecastElement, LcuFathymForecastApiKeysElementComponent, SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT, LcuFathymForecastAnalyticsElementComponent, SELECTOR_LCU_FATHYM_FORECAST_ANALYTICS_ELEMENT
} from '@habistack/lcu-fathym-forecast-common';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule,
    LcuFathymForecastModule
  ],
  providers: [
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment)
    }
  ],
  exports: [LcuFathymForecastModule]
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
  
		const apiKeys = createCustomElement(LcuFathymForecastApiKeysElementComponent, { injector: this.injector });

		customElements.define(SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT, apiKeys);
	
		const analytics = createCustomElement(LcuFathymForecastAnalyticsElementComponent, { injector: this.injector });

		customElements.define(SELECTOR_LCU_FATHYM_FORECAST_ANALYTICS_ELEMENT, analytics);
	}
}

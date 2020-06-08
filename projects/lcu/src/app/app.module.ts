import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FathymSharedModule, LCUServiceSettings } from '@lcu/common';
import { environment } from '../environments/environment';
import {
  LcuFathymForecastModule,
  LcuFathymForecastApiKeysElementComponent,
  SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT,
  FathymForecastStateContext, LcuFathymForecastRoutingElementComponent, SELECTOR_LCU_FATHYM_FORECAST_ROUTING_ELEMENT,
} from '@habistack/lcu-fathym-forecast-common';
import { createCustomElement } from '@angular/elements';
import { RouterModule, ActivatedRoute } from '@angular/router';

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
    const apiKeys = createCustomElement(
      LcuFathymForecastApiKeysElementComponent,
      { injector: this.injector }
    );

    customElements.define(
      SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT,
      apiKeys
    );
  
		const routing = createCustomElement(LcuFathymForecastRoutingElementComponent, { injector: this.injector });

		customElements.define(SELECTOR_LCU_FATHYM_FORECAST_ROUTING_ELEMENT, routing);
	}
}

import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';

export class LcuFathymForecastAnalyticsElementState {}

export class LcuFathymForecastAnalyticsContext extends LCUElementContext<LcuFathymForecastAnalyticsElementState> {}

export const SELECTOR_LCU_FATHYM_FORECAST_ANALYTICS_ELEMENT = 'lcu-fathym-forecast-analytics-element';

@Component({
  selector: SELECTOR_LCU_FATHYM_FORECAST_ANALYTICS_ELEMENT,
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class LcuFathymForecastAnalyticsElementComponent extends LcuElementComponent<LcuFathymForecastAnalyticsContext> implements OnInit {
  //  Fields

  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();
  }

  //  API Methods

  //  Helpers
}

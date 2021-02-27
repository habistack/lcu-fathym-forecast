// import { BillingPlanOption, FathymForecastState } from './fathym-forecast.state';
import { FathymForecastState } from './fathym-forecast.state';
import { StateContext, Status } from '@lcu/common';
import { Injectable, Injector } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class FathymForecastStateContext extends StateContext<FathymForecastState> {
  //  Fields

  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  API Methods

  //  Helpers
  protected defaultValue() {
    return { Loading: true } as FathymForecastState;
  }

  protected loadStateKey(): string {
    return 'manage';
  }

  protected loadStateName(): string {
    return 'fathymforecast';
  }
}

// import { BillingPlanOption, FathymForecastState } from './fathym-forecast.state';
import { FathymForecastState } from './fathym-forecast.state';
import { StateContext, Status } from '@lcu/common';
import { Injectable, Injector } from '@angular/core';
import { forkJoin, combineLatest } from 'rxjs';
import { Router, ActivationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

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
  public CreateAPISubscription() {
    this.Execute({
      Arguments: {},
      Type: 'CreateAPISubscription',
    });
  }

  public GenerateAPIKeys(keyType: string) {
    this.Execute({
      Arguments: {
        KeyType: keyType
      },
      Type: 'GenerateAPIKeys',
    });
  }

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

import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';

export class LcuFathymForecastApiKeysElementState {}

export class LcuFathymForecastApiKeysContext extends LCUElementContext<LcuFathymForecastApiKeysElementState> {}

export const SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT = 'lcu-fathym-forecast-api-keys-element';

@Component({
  selector: SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT,
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.scss']
})
export class LcuFathymForecastApiKeysElementComponent extends LcuElementComponent<LcuFathymForecastApiKeysContext> implements OnInit {
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

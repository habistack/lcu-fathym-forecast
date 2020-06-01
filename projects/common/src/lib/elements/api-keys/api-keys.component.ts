import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { FathymForecastState } from '../../state/fathym-forecast.state';
import { FathymForecastStateContext } from '../../state/fathym-forecast-state.context';

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
  public APIKeyTypes: string[];

  public State: FathymForecastState;

  //  Constructors
  constructor(
    protected injector: Injector,
    protected forecastCtxt: FathymForecastStateContext
  ) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();

    this.forecastCtxt.Context.subscribe((state) => {
      this.State = state;

      if (this.State) {
        this.stateChanged();
      }
    });
  }

  //  API Methods

  //  Helpers
  protected stateChanged() {
    if (this.State.APIKeys) {
      this.APIKeyTypes = Object.keys(this.State.APIKeys);
    } else {
      this.APIKeyTypes = [];
    }
  }
}

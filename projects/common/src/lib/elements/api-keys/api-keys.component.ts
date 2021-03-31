import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Injector, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { FathymForecastStateContext } from '../../state/fathym-forecast/fathym-forecast-state.context';
import { FathymForecastState } from '../../state/fathym-forecast/fathym-forecast.state';

export class LcuFathymForecastApiKeysContext extends LCUElementContext<FathymForecastState> {}

export const SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT =
  'lcu-fathym-forecast-api-keys-element';

@Component({
  selector: SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT,
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.scss'],
})
export class LcuFathymForecastApiKeysElementComponent
  extends LcuElementComponent<LcuFathymForecastApiKeysContext>
  implements OnInit {
  //  Fields

  //  Properties

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
      this.Context = {
        ...(this.Context || {}),
        State: state,
      };

      this.stateChanged();
    });
  }

  //  API Methods
  public RegenerateAPIKey(keyName: string) {
    // this.State.Loading = true;

    alert('Implement regenerate: ' + keyName);
    // this.iotEnsCtxt.RegenerateAPIKey(keyName);
  }

  //  Helpers
  protected stateChanged() {
    console.log(this.Context);
  }
}

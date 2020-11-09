import { FathymForecastState } from './../../state/fathym-forecast/fathym-forecast.state';
import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { FathymForecastStateContext } from '../../state/fathym-forecast/fathym-forecast-state.context';

export class LcuFathymForecastRoutingElementState {}

export class LcuFathymForecastRoutingContext extends LCUElementContext<LcuFathymForecastRoutingElementState> {}

export const SELECTOR_LCU_FATHYM_FORECAST_ROUTING_ELEMENT = 'lcu-fathym-forecast-routing-element';

@Component({
  selector: SELECTOR_LCU_FATHYM_FORECAST_ROUTING_ELEMENT,
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.scss']
})
export class LcuFathymForecastRoutingElementComponent extends
  LcuElementComponent<LcuFathymForecastRoutingContext> implements OnInit {
  //  Fields

  //  Properties
  public State: FathymForecastState;
  //  Constructors
  constructor(
    protected injector: Injector,
    protected forecastCtxt: FathymForecastStateContext) {
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
  
  }
}

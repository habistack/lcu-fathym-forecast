import { Component, OnInit, Injector } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { FathymForecastState } from './../../state/fathym-forecast/fathym-forecast.state';
import { FathymForecastStateContext } from '../../state/fathym-forecast/fathym-forecast-state.context';
import { ActivatedRoute } from '@angular/router';

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
  public ShowPage: string = 'API';

  public State: FathymForecastState;

  protected routeSubscription: Subscription;

  //  Constructors
  constructor(protected injector: Injector,
    protected forecastCtxt: FathymForecastStateContext,
    protected route: ActivatedRoute) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();
  }

  //  API Methods

  //  Helpers
}


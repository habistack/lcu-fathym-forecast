import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';

export class LcuFathymForecastRoutingElementState {}

export class LcuFathymForecastRoutingContext extends LCUElementContext<LcuFathymForecastRoutingElementState> {}

export const SELECTOR_LCU_FATHYM_FORECAST_ROUTING_ELEMENT = 'lcu-fathym-forecast-routing-element';

@Component({
  selector: SELECTOR_LCU_FATHYM_FORECAST_ROUTING_ELEMENT,
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.scss']
})
export class LcuFathymForecastRoutingElementComponent extends LcuElementComponent<LcuFathymForecastRoutingContext> implements OnInit {
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
import { FathymForecastState } from './../../state/fathym-forecast/fathym-forecast.state';
import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { LCUElementContext, LcuElementComponent, RouterHelpersService } from '@lcu/common';
import { FathymForecastStateContext } from '../../state/fathym-forecast/fathym-forecast-state.context';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs/internal/operators/combineLatest';
import { Subscription } from 'rxjs/internal/Subscription';
// import { filter } from 'rxjs/operators';

export class LcuFathymForecastRoutingElementState {}

export class LcuFathymForecastRoutingContext extends LCUElementContext<LcuFathymForecastRoutingElementState> {}

export const SELECTOR_LCU_FATHYM_FORECAST_ROUTING_ELEMENT = 'lcu-fathym-forecast-routing-element';

@Component({
  selector: SELECTOR_LCU_FATHYM_FORECAST_ROUTING_ELEMENT,
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.scss']
})
export class LcuFathymForecastRoutingElementComponent extends
  LcuElementComponent<LcuFathymForecastRoutingContext> implements OnInit, OnDestroy {
  //  Fields

  //  Properties

  public ShowPage: string;

  public State: FathymForecastState;

  protected routeSubscription: Subscription;



  //  Constructors
  constructor(
    protected injector: Injector,
    protected forecastCtxt: FathymForecastStateContext,
    protected routerHelperService: RouterHelpersService,
    protected route: ActivatedRoute) {
    super(injector);
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    throw new Error('Method not implemented.');
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();

    this.routeSubscription = this.route.queryParams.subscribe((params: any) => {
     this.queryParamCallback(params);
    });

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

  /**
   * Callback for route subscription
   *
   * @param val object returned from route subscription
   */
  protected queryParamCallback(val: object): void {
    const length: number = Object.keys(val).length;

    if (length > 0) {
      for (const key in val) {
        if (key.toUpperCase() === 'PAGE') {
          this.ShowPage = val[key].toUpperCase();
        }
      }
    } else {
      this.ShowPage = 'API';
    }
  }
}

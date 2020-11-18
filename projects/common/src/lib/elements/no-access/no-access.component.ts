import { Component, OnInit } from '@angular/core';
import { FathymForecastStateContext } from '../../state/fathym-forecast/fathym-forecast-state.context';

export const SELECTOR_LCU_FATHYM_FORECAST_NO_ACCESS_ELEMENT =
  'lcu-fathym-forecast-no-access-element';

@Component({
  selector: SELECTOR_LCU_FATHYM_FORECAST_NO_ACCESS_ELEMENT,
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss']
})
export class LcuFathymForecastNoAccessComponent implements OnInit {

  constructor(protected forecastCtxt: FathymForecastStateContext) { }

  ngOnInit(): void {
  }

  public Pricing(): void {
    window.open('https://fathym.com/forecaster-pricing/', '_blank');
  }

}

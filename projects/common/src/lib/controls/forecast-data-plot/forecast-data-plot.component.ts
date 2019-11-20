import { Component, OnInit, Input, Output, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { Plot } from '../plots/plots';
import { VariableDataPlotComponent } from '../variable-data-plot/variable-data-plot.component';
import { TemperaturePlot } from '../plots/temperature-plot/temperature-plot';
import { PotentialRoadStatePlot } from '../plots/potential-road-state_plot/potential-road-state-plot';
import { PotentialDelayRiskPlot } from '../plots/potential-delay-risk-plot/potential-delay-risk-plot';
import { PrecipitationPlot } from '../plots/precipitation-plot/precipitation-plot';
import { SnowDepthPlot } from '../plots/snow-depth-plot/snow-depth-plot';
import { WindPlot } from '../plots/wind-plot/wind-plot';
import { CrosswindPlot } from '../plots/crosswind-plot/crosswind-plot';
import { ElevationPlot } from '../plots/elevation-plot/elevation-plot';
import { NumericPlot } from '../plots/numeric-plot/numeric-plot';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'lcu-forecast-data-plot',
  templateUrl: './forecast-data-plot.component.html',
  styleUrls: ['./forecast-data-plot.component.scss']
})
export class ForecastDataPlotComponent {

  /**
   * Forecast data
   */
  // tslint:disable-next-line:no-input-rename
  private _forecastData: any;
    @Input('forecast-data')
    public set ForecastData(val: any) {
      console.log('forecast data plot ForecastData', val);
      this._forecastData = val;
    }

    public get ForecastData(): any {
      return this._forecastData;
    }

/**
 * valid times
 */
  // tslint:disable-next-line:no-input-rename
  @Input('valid-times')
  public ValidTimes: any;

/**
 * event for mouse movement on charts
 */
  // tslint:disable-next-line:no-output-rename
  @Output('chart-mouse-move')
  public ChartMousemove = new EventEmitter();

  /**
   * plot component
   */
  @ViewChildren(VariableDataPlotComponent) varPlots: QueryList<VariableDataPlotComponent>;

constructor(protected notificationService: NotificationService) {}

  /**
   * array of plot
   */
  public PlotConfigs: Array<Plot> = [];

  /**
   * clear plots
   */
  public Clear(): void {
    this.varPlots.map(x => x.Clear());
    this.PlotConfigs = null;
   }

  /**
   * Set up plots
   */
  public Refresh() {
    this.PlotConfigs = [
      new TemperaturePlot('F', 'Forecast'),
      new PotentialRoadStatePlot(null, 'Forecast'),
      new PotentialDelayRiskPlot(null, 'Forecast'),
      new CrosswindPlot(null, 'Forecsat'),
      new PrecipitationPlot('mm/hr', 'Forecast'),
      new SnowDepthPlot('mm', 'Forecast' ),
      new WindPlot('m/s', 'Forecast'),
      // new IrradiancePlot('watt/m^2'),
      // new CloudCoverPlot('%'),
      new ElevationPlot('ft', ''),
      new NumericPlot('Wave Height', {wvhgt: {title: 'Wave Height', color: '#00008d'}}, 'm', '')
    ];

    for (const plot of this.PlotConfigs) {
      // if(plot.hasData(this.ForecastData)){
      console.log("plot: ", plot)

      // }
     plot.chartMousemove.subscribe((e) => {
        this.notificationService.OnChartMouseMove(e);
      });
    }

    this.varPlots.map((x) => {
      x.Refresh();
    });
  }
}

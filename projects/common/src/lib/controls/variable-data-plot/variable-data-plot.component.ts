import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Plot } from '../plots/plots';

@Component({
  selector: 'lcu-variable-data-plot',
  templateUrl: './variable-data-plot.component.html',
  styleUrls: ['./variable-data-plot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VariableDataPlotComponent implements OnInit {

  /**
   * forecast data
   */
    // tslint:disable-next-line:no-input-rename
    @Input('forecast-data')
    public ForecastData: any;


    /**
     * valid times
     */
    // tslint:disable-next-line:no-input-rename
    @Input('valid-times')
    public ValidTimes: any;


    /**
     * plot
     */
    // tslint:disable-next-line:no-input-rename
    @Input('plot')
    public Plot: Plot;

    /**
     * D3 plot
     */
    @ViewChild('d3plot', {static: false})
    public d3plot: any;

    /**
     * chart data
     */
    public ChartData: Array<any>;

    /**
     * chart options
     */
    public Options: object;

    /**
     * hide or show property
     */
    public ShowPlots: boolean;

    ngOnInit() {
        this.ShowPlots = true;
        this.Plot.setD3Plot(this.d3plot);
        this.Refresh();
    }

    /**
     * clear plots
     */
    public Clear(): void {
        this.Options = null;
        this.ChartData = null;
        this.ShowPlots = false;
    }

    /**
     * refresh plots with new data and options
     */
    public Refresh(): void {
        this.Plot.loadChartData(this.ForecastData, this.ValidTimes);
        this.Options = this.Plot.getOptions();
        this.ChartData = this.Plot.getChartData();
    }

}

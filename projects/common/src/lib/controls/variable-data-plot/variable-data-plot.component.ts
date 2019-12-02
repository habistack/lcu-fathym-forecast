import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Plot } from '../plots/plots';

declare let d3: any;

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
    private _forecastData: any;
    @Input('forecast-data')
    public set ForecastData(val: any) {
      // console.log('variable data plot ForecastData', val);
    
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
    private _chartData: Array<any>;
    public set ChartData(val: Array<any>) {
      // console.log('chart data', val);
      this._chartData = val;
    }
  
    public get ChartData(): Array<any> {
      return this._chartData;
    }

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
        // this.formatChartData();

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

    // protected formatChartData():void{
    //   console.log("key = ", this.ChartData[0].key)
    //   if(this.ChartData[0].key === 'Wind Speed'){
    //     console.log("chart data vals", this.ChartData[0].values)
    //     this.ChartData[0].values.forEach(val =>{
    //       // console.log("val = ", val)
    //       // val.y= val.y.toString()+' mph'
    //       // console.log(val.y)
    //     })
    //   }
    //   this.ChartData
    // }

}

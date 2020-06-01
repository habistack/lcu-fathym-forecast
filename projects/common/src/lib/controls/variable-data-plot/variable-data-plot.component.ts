import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { Plot } from '../plots/plots';
import { DateFormatModel, colorSets } from '@lowcodeunit/lcu-charts-common';
import * as shape from 'd3-shape';
import { weatherData } from '../../../lib/constants/data';


declare let d3: any;

@Component({
  selector: 'lcu-variable-data-plot',
  templateUrl: './variable-data-plot.component.html',
  styleUrls: ['./variable-data-plot.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VariableDataPlotComponent implements OnInit {
  public animations: boolean = true;
  public autoScale: boolean = false;
  public colorScheme: any;
  public curve: any;
  public gradient: boolean = false;
  public legendPosition: string = 'right';
  public legendTitle: string = '';
  public maxXAxisTickLength: number = 16;
  public maxYAxisTickLength: number = 16;
  public rangeFillOpacity: number = 0.15;
  public rotateXAxisTicks: boolean = true;
  public roundDomains: boolean = false;
  public schemeType: string = 'ordinal';
  public showGridLines: boolean = true;
  public showLegend: boolean = false;
  public showXAxis: boolean = true;
  public showXAxisLabel: boolean = false;
  public showYAxis: boolean = true;
  public showYAxisLabel: boolean = false;
  public timeline: boolean = false;
  public tooltipDisabled: boolean = false;
  public trimXAxisTicks: boolean = true;
  public trimYAxisTicks: boolean = true;
  public view: any[];
  public weatherData: any[];
  public xAxisLabel: string = 'Time';
  public xScaleMax: any;
  public xScaleMin: any;
  public yAxisLabel: string = 'Temperature (F)';
  public yScaleMax: number = 100;
  public yScaleMin: number;
  public yUnits: string = '\u00B0';
  public backgroundGradientConfigs: BackgroundGradientConfigurationNode[] = [];
  public showPercentage: boolean = false;
  public yAxisTickFormatting = this.FormatYAxisTicks.bind(this);
  public yAxisTicks: Array<any> = [0, 30, 50, 100];
  public xAxisIsDate: boolean = true;
  public xAxisDateFormat: DateFormatModel = {
    DayOfWeek: true,
    Month: false,
    DayOfMonth: true,
    Year: false,
    Time: true,
    TimeZone: false
  };

  private colorSets: any;
  private curveType: string = 'Linear';
  private curves: any;
  private fitContainer: boolean = false;
  private height: number = 225;
  private width: number = 450;

  /**
   * forecast data
   */
    // tslint:disable-next-line:no-input-rename
    private _forecastData: any;
    @Input('forecast-data')
    public set ForecastData(val: any) {
      console.log('variable data plot ForecastData', val);
    
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
      // console.log('chart data', this._chartData);

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

    public hoveredVerticalChange(e) {
      // console.log('message from tooltip - the x value hover has changed to: ', e)
  
      this.ManualHover = e;
      // now send it back to the tooltip to manually show that vertical line
    }
  
    public ManualHover: any;
  
    public onHoverChange(e) {
      this.ManualHover = e;
      // console.log('on hover change...: ', e)
      this.ManualHover = e;
    }
    constructor() {
      Object.assign(this, {
        colorSets,
        weatherData
      });
      this.setColorScheme('cool');
      this.setBackgroundGradientConfigs();
    }

    ngOnInit() {
        
        this.ShowPlots = true;
        this.Plot.setD3Plot(this.d3plot);
        if (!this.fitContainer) {
          this.applyDimensions();
        }
        this.curves = {
          'Basis': shape.curveBasis,
          'Basis Closed': shape.curveBasisClosed,
          'Bundle': shape.curveBundle.beta(1),
          'Cardinal': shape.curveCardinal,
          'Cardinal Closed': shape.curveCardinalClosed,
          'Catmull Rom': shape.curveCatmullRom,
          'Catmull Rom Closed': shape.curveCatmullRomClosed,
          'Linear': shape.curveLinear,
          'Linear Closed': shape.curveLinearClosed,
          'Monotone X': shape.curveMonotoneX,
          'Monotone Y': shape.curveMonotoneY,
          'Natural': shape.curveNatural,
          'Step': shape.curveStep,
          'Step After': shape.curveStepAfter,
          'Step Before': shape.curveStepBefore,
          'default': shape.curveLinear
        };
        this.curve = this.curves[this.curveType];
        this.Refresh();
        this.setBackgroundGradientConfigs();

        // this.formatChartData();

    }
    public FormatYAxisTicks(value: any) {
      if (value <= 0) {
        return "Freezing";
      }
      if (value > 0 && value <= 32) {
        return "Cold";
      }
      if (value > 32 && value <= 70) {
        return "Warm";
      }
      if (value > 70) {
        return "Hot";
      }
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
        // console.log("chart data: ", this.ChartData)
        let time = new Date(this.ChartData[0].values[0].x);
        // console.log("time: ", time.toString())

    }

  

    protected setBackgroundGradientConfigs() {
      // console.log("weather data:", this.weatherData)
      // console.log("scheme:", this.schemeType)


      const backgroundMarker = this.weatherData[0].series;
  
      backgroundMarker.forEach((ser, idx) => {
        const idxPercentage = idx * 100 / backgroundMarker.length;
        if (ser.value > 38) {
          this.backgroundGradientConfigs.push({
            offset: idxPercentage,
            color: 'red'
          });
        } else if (ser.value > 33) {
          this.backgroundGradientConfigs.push({
            offset: idxPercentage,
            color: 'orange'
          });
        } else {
          this.backgroundGradientConfigs.push({
            offset: idxPercentage,
            color: 'blue'
          });
        }
      });
      // console.log("color configs", this.backgroundGradientConfigs)
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
    private applyDimensions(): void {
      this.view = [this.width, this.height];
    }
    private setColorScheme(name: string): void {
      this.colorScheme = this.colorSets.find(s => s.name === name);
    }
    public activate(data: any): void {
      console.log('Activate', JSON.parse(JSON.stringify(data)));
    }
  
    public deactivate(data: any): void {
      console.log('Deactivate', JSON.parse(JSON.stringify(data)));
    }
  
    public onLegendLabelClick(entry: any): void {
      console.log('Legend clicked', entry);
    }
  
    public select(data: any): void {
      console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    }

}
export class BackgroundGradientConfigurationNode {
  offset: number;
  color: string;

  constructor(node: BackgroundGradientConfigurationNode) {
    this.offset = node.offset;
    this.color = node.color;
  }
}

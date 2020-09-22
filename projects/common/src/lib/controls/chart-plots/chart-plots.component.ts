import { Component, OnInit } from '@angular/core';
import { ForecastDataModel } from '../../models/forecast-data.model';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';
import { DateFormatModel, colorSets, ViewDimensions } from '@lowcodeunit/lcu-charts-common';
import * as shape from 'd3-shape';
import { TemperatureConversion } from '@lcu/common';
import { values } from 'd3';
import { threadId } from 'worker_threads';

@Component({
  selector: 'lcu-chart-plots',
  templateUrl: './chart-plots.component.html',
  styleUrls: ['./chart-plots.component.css']
})
export class ChartPlotsComponent implements OnInit {


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
  public precipMeasurmentPerHour: string = 'mm/hr';
  public precipMeasurment: string = 'mm';
  // public weatherData: any[];
  public xAxisLabel: string = 'Time';
  public xScaleMax: any;
  public xScaleMin: any;
  public yAxisLabel: string = 'Temperature (F)';
  
  // public yScaleMax: number = 100;
  // public yScaleMin: number;
  // public yUnits: string = '\u00B0';
  public backgroundGradientConfigs: any[] = [];
  public showPercentage: boolean = false;
  // public yAxisTickFormatting = this.FormatYAxisTicks.bind(this);
  // public yAxisTicks: Array<any> = [0, 30, 50, 100];
  public xAxisIsDate: boolean = true;
  public xAxisDateFormat: DateFormatModel = {
    DayOfWeek: true,
    Month: false,
    DayOfMonth: true,
    Year: false,
    Time: true,
    TimeZone: false
  };
  public ForecastData: any;
  public Charts: Array<any>;
  public dims: ViewDimensions= {width:300, height: 200, xOffset:80}

  private colorSets: any;
  private curveType: string = 'Linear';
  private curves: any;
  private fitContainer: boolean = false;
  private height: number = 300;
  private width: number = 400;

  public ChartData: any = [];

  protected forecastPlotDataSubsription: Subscription;

  constructor(protected notificationService: NotificationService) {
    
    Object.assign(this, {
      colorSets,
      // weatherData
    });
    this.setColorScheme('cool');
  }

  ngOnInit() {
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
    if (!this.fitContainer) {
      this.applyDimensions();
    }
    this.forecastPlotDataSubsription = this.notificationService.ForecastPlotDataChanged.subscribe(
      (data: ForecastDataModel) => {
        if (!data) {
          console.error('PlotDataSubscription - No data returned'); return;
        }
        console.log('data from chart-plots: ', data);
        this.ForecastData = data;
        this.convertData();
        // this.setBackgroundGradientConfigs();
      }
    );
  }

  public hoveredVerticalChange(e) {
    // console.log('message from tooltip - the x value hover has changed to: ', e)
    this.ManualHover = e;
    // now send it back to the tooltip to manually show that vertical line
  }

  protected FormatTempYAxisTicks(value: any) {
    
    if (value <= 0) {
      return "Freezing";
    }
    if (value > 0 && value <= 32) {
      return "Cold";
    }
    if (value > 32 && value <= 50) {
      return "Cool"
    }
      
    if (value > 50 && value <= 70) {
      return "Warm";
    }
    if (value > 70 && value <=100) {
      return "Hot";
    }
    if(value > 100){
      return "Very Hot"
    }
  }

  
  protected FormatRoadStateYAxisTicks(val: any) {
    if (val === 0) { return "Dry"; }
    if (val === 1) { return "Wet"; }
    if (val === 2) { return "Freezing Rain"; }
    if (val === 3) { return "Snow"; }
    if (val === 4) { return "Snow & Ice"; }
    if (val === 5) { return "Freezing Rain & Ice"; }
    if (val === 6) { return "Ice"; }
    if (val === 7) { return "Hail & Ice"; }
    if (val === 8) { return "Hail"; }
  }

  protected FormatDelayRiskYAxisTicks(val: any) {
    val = Math.round(val);
    if (val === 0.0) { return "None"; }
    if (val === 1.0) { return "Normal"; }
    if (val === 2.0) { return "Slight"; }
    if (val === 3.0) { return "Moderate"; }
    if (val === 4.0) { return "Heavy"; }
    if (val === 5.0) { return "Severe"; }
    if (val === 6.0) { return "Extreme"; }
  }

  public FormatDelayRiskTooltip(val: any){
    // console.log("calling delay risk tooltip formatting: ", val)
    if (val >= 0 && val < 1) { return "None"; }
    if (val >= 1 && val < 2) { return "Normal"; }
    if (val >= 2 && val < 3) { return "Slight"; }
    if (val >= 3 && val < 4) { return "Moderate"; }
    if (val >= 4 && val < 5) { return "Heavy"; }
    if (val >= 5 && val < 6) { return "Severe"; }
    if (val >= 6) { return "Extreme"; }
  }

  protected FormatCrosswindRiskYAxisTicks(val: any){
    val = Math.floor(val*2)/2;
    if (val === 0.0) { return "Low"; }
    if (val === 0.50) { return "Slight"; }
    if (val === 1.0) { return "Moderate"; }
    if (val === 1.5) { return "High"; }
    if (val === 2.0) { return "Severe"; }
  }

  public FormatCrosswindRiskTooltip(val: any){
    // console.log("calling cw Tooltip: ", val);
    if (val >= 0 && val < 0.50) { return "Low"; }
    if (val >= 0.50 && val < 1.0) { return "Slight"; }
    if (val >= 1.0 && val < 1.5) { return "Moderate"; }
    if (val >= 1.5 && val < 2.0) { return "High"; }
    if (val >= 2.0) { return "Severe"; }
  }

  protected FormatPrecipitationRateYAxisTicks(val: any){
    return val;
  }

  // public FormatPrecipitationRateTooltip(val: any){
  //   return val + " " + this.precipMeasurment;
  // }

  protected FormatSnowDepthYAxisTicks(val: any){
    return val;

  }

  // public FormatSnowDepthTooltip(val: any){
  //   if(val){
  //     return val + " " + this.precipMeasurment;
  //   }
  //   else{
  //     return 0 + " " + this.precipMeasurment;

  //   }
  // }

  protected setBackgroundGradientConfigsTemp(backgroundMarker: any) {
    // console.log("weather data:", this.weatherData)
    // console.log("scheme:", this.schemeType)
    let backgroundGradient = new Array<any>();

    // const backgroundMarker = this.ChartData[0].series;

    backgroundMarker.forEach((ser, idx) => {
      const idxPercentage = idx * 100 / backgroundMarker.length;
      if (ser.value > 95) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: 'red'
        });
      } else if (ser.value > 85) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: 'yellow'
        });
      } 
      else if (ser.value > 32) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: 'green'
        });
      }else {
        backgroundGradient.push({
          offset: idxPercentage,
          color: 'blue'
        });
      }
    });
    // console.log("color configs", backgroundGradient)
    return backgroundGradient;
  }

  protected setBackgroundGradientConfigsRoadState(backgroundMarker: any) {
    // console.log("weather data:", this.weatherData)
    // console.log("scheme:", this.schemeType)
    let backgroundGradient = new Array<any>();

    // const backgroundMarker = this.ChartData[0].series;



    backgroundMarker.forEach((ser, idx) => {
      const idxPercentage = idx * 100 / backgroundMarker.length;
      if (ser.value === 0) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#ffffff'
        });
      } else if (ser.value ===1 ) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#00dd00'
        });
      } 
      else if (ser.value === 2) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#669866'
        });
      }
      else if (ser.value === 3) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#b760b7'
        });
      }else if (ser.value === 4) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#8C338F'
        });
      }else if (ser.value === 5) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#9F45A5'
        });
      }else if (ser.value === 6) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#6F0475'
        });
      }else if (ser.value === 7) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#80044B'
        });
      }else if (ser.value === 8) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#008888'
        });
      }else {
        backgroundGradient.push({
          offset: idxPercentage,
          color: 'grey'
        });
      }
    });
    // console.log("color configs", backgroundGradient)
    return backgroundGradient;
  }

  protected setBackgroundGradientConfigsDelayRisk(backgroundMarker: any) {
    // console.log("weather data:", this.weatherData)
    // console.log("scheme:", this.schemeType)
    let backgroundGradient = new Array<any>();

    // const backgroundMarker = this.ChartData[0].series;

    backgroundMarker.forEach((ser, idx) => {
      // console.log("delay risk: ", ser)
      const idxPercentage = idx * 100 / backgroundMarker.length;
      if (ser.value === 0 || ser.value <1) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#00dd00'
        });
      } 
      else if (ser.value >= 1 && ser.value < 2) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#bffc05'
        });
      }else if (ser.value >= 2 && ser.value < 3) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#ffff00'
        });
      
      }else if (ser.value >= 3 && ser.value < 4) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#fcb205'
        });
      
      }
      else if (ser.value >= 4 && ser.value < 5) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#ff0000'
        });
      
      }else if (ser.value >= 5) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#6e000'
        });
      }else {
        backgroundGradient.push({
          offset: idxPercentage,
          color: 'grey'
        });
      }
    });
    // console.log("color configs", backgroundGradient)
    return backgroundGradient;
  }

  protected setBackgroundGradientConfigsCrosswindRisk(backgroundMarker: any){
    let backgroundGradient = new Array<any>();

    backgroundMarker.forEach((ser, idx) => {
      // console.log("delay risk: ", ser)
      const idxPercentage = idx * 100 / backgroundMarker.length;
      if (ser.value === 0 || ser.value <.50) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#0d0'
        });
      } 
      else if (ser.value >= .50 && ser.value < 1.00) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#ff0'
        });
      }else if (ser.value > 1.00 && ser.value < 1.50 ) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#f00'
        });
      }else {
        backgroundGradient.push({
          offset: idxPercentage,
          color: 'grey'
        });
      }
    });
    // console.log("color configs", backgroundGradient)
    return backgroundGradient;
  }

  protected setBackgroundGradientConfigsPrecipRate(backgroundMarker: any){
    let backgroundGradient = new Array<any>();

    backgroundMarker.forEach((ser, idx) => {
      // console.log("precip rate: ", ser)
      const idxPercentage = idx * 100 / backgroundMarker.length;

      if (ser.value === null || !ser.value) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#ffffff' //grey
        });
      }
  
      if (ser.state === "Dry") {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#ffffff' //white
        });
      } else if (ser.state === "Wet" || ser.state === "Freezing Rain") { //rain or freezing rain
        if (ser.value > 0 && ser.value < 0.5) {
          backgroundGradient.push({
            offset: idxPercentage,
            color: '#00dd00' //green
          });
        } else if (ser.value >= 0.5 && ser.value < 0.75) {
          backgroundGradient.push({
            offset: idxPercentage,
            color: '#ffff00' //yellow
          });
        } else if (ser.value >= 0.75) {
          backgroundGradient.push({
            offset: idxPercentage,
            color: '#ff0000' // red
          });
        }
      } else if (ser.value === "Snow" || ser.value === "Snow and Ice" ||ser.value === "Freezing Rain and Ice" || ser.value === "Ice") {
        if (ser.value > 0 && ser.value < 0.5) {
          backgroundGradient.push({
            offset: idxPercentage,
            color: '#d68dd6' //light purple
          });
        } else if (ser.value >= 0.5 && ser.value < 0.75) {
          backgroundGradient.push({
            offset: idxPercentage,
            color: '#873b87' //purple
          });
        } else if (ser.value >= 0.75) {
          backgroundGradient.push({
            offset: idxPercentage,
            color: '#700470' //dark purple
          });
        }
      } else {// hail and ice or hail
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#800a01' //dark red
        });
      }

    });
    return backgroundGradient;
  }

  public setBackgroundGradientConfigsSnowDepth(backgroundMarker: any){
    let backgroundGradient = new Array<any>();

    backgroundMarker.forEach((ser, idx) => {
      // console.log("snow depth: ", ser)
      const idxPercentage = idx * 100 / backgroundMarker.length;

    if(ser.val === null){
      backgroundGradient.push({
        offset: idxPercentage,
        color: '#d8d8d8'
      });
    }
      else if (ser.value < 2 ) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#0d0'
        });
      } 
      else if (ser.value >= 2 && ser.value <= 4) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#b760b7'
        });
      }else if (ser.value > 4 ) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#0000dd'
        });
      }else {
        backgroundGradient.push({
          offset: idxPercentage,
          color: 'white'
        });
      }
    });
    return backgroundGradient;
  }

  public ManualHover: any;

  public onHoverChange(e) {
    this.ManualHover = e;
    // console.log('on hover change...: ', e)
    this.ManualHover = e;
  }

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

  protected convertData() {
    this.Charts = new Array<any>();
    // console.log(this.ForecastData);
    this.ChartData = {
      name: "Road Temperature",
      displayData:[
        {name: 'Surface Temp', series: []},
        {name: 'Road Temp', series: []}
      ],
      chartGradient: [],
      YtickFormat: this.FormatTempYAxisTicks.bind(this),
      yAxisTicks:  [0,30,70,100,120],
      yScaleMax:120,
      yScaleMin:0,
      yUnits:'\u00B0',
     
    }

    this.ForecastData.forecast.surfaceTemperature.forEach((temp, idx) => {
      this.ChartData.displayData[0].series.push(
        {
          value: Math.round(TemperatureConversion.KelvinToFahrenheit(temp)),
          name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
        }
      );
    });
    this.ForecastData.forecast.roadTemperature.forEach((temp, idx) => {
      this.ChartData.displayData[1].series.push(
        {
          value: Math.round(TemperatureConversion.KelvinToFahrenheit(temp)),
          name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
        }
      );
    });
    this.ChartData.chartGradient = this.setBackgroundGradientConfigsTemp(this.ChartData.displayData[0].series)

    this.Charts.push(this.ChartData);

    let roadChartData = {
      name: "Road State",
      displayData:[
      {name: 'Road State', series: []}
    ],
    chartGradient: [],
    YtickFormat: this.FormatRoadStateYAxisTicks.bind(this),
    yAxisTicks:  [0,1,3,6,8],
    yScaleMax: 8,
    yScaleMin:0,
    yUnits:'',
    formatTooltip: true,
    tooltipFormatting: this.FormatRoadStateYAxisTicks.bind(this)

  }
    this.ForecastData.forecast.roadState.forEach((state, idx) => {
      roadChartData.displayData[0].series.push(
        {
          value: this.determineRoadState(state),
          // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
          name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
        }
      );
    });
    roadChartData.chartGradient = this.setBackgroundGradientConfigsRoadState(roadChartData.displayData[0].series)

    this.Charts.push(roadChartData);

    let delayRiskData = {
      name: "Potential Delay Risk",
      displayData:[
      {name: 'Potential Delay Risk', series: []}
    ],
    chartGradient: [],
    YtickFormat: this.FormatDelayRiskYAxisTicks.bind(this),
    yAxisTicks:  [0,1,2,3,4,5,6],
    yScaleMax: 6,
    yScaleMin:0,
    yUnits:'',
    formatTooltip: true,
    tooltipFormatting: this.FormatDelayRiskTooltip.bind(this),

  }
  this.ForecastData.forecast.routeDelayRisk.forEach((state, idx) => {
    delayRiskData.displayData[0].series.push(
      {
        value: state,
        // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
        name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
      }
    );
  });
  delayRiskData.chartGradient = this.setBackgroundGradientConfigsDelayRisk(delayRiskData.displayData[0].series)

  this.Charts.push(delayRiskData);

  let crosswindRiskData = {
    name: "Crosswind Risk",
    displayData:[
    {name: 'Crosswind Risk', series: []}
  ],
  chartGradient: [],
  YtickFormat: this.FormatCrosswindRiskYAxisTicks.bind(this),
  yAxisTicks:  [0.0,0.5,1.0,1.5,2.0],
  yScaleMax: 2,
  yScaleMin:0,
  formatTooltip: true,
  tooltipFormatting: this.FormatCrosswindRiskYAxisTicks.bind(this)


}
this.ForecastData.forecast.crosswindRisk.forEach((state, idx) => {
  crosswindRiskData.displayData[0].series.push(
    {
      value: state,
      // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
      name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
    }
  );
});
crosswindRiskData.chartGradient = this.setBackgroundGradientConfigsCrosswindRisk(crosswindRiskData.displayData[0].series)

this.Charts.push(crosswindRiskData);

//PRECIP RATE

let precipRateData = {
  name: "Precipitation Rate",
  displayData:[
  {name: 'Precipitation Rate', series: []}
],
chartGradient: [],
YtickFormat: this.FormatPrecipitationRateYAxisTicks.bind(this),
yAxisTicks:  [0.0,0.25,0.50,0.75,1.0],
yScaleMax: 1,
yScaleMin:0,
yUnits:this.precipMeasurmentPerHour,
formatTooltip: true,
tooltipFormatting: this.FormatPrecipitationRateYAxisTicks.bind(this),
}
this.ForecastData.forecast.precipitationRate.forEach((val, idx) => {
precipRateData.displayData[0].series.push(
  {
    value: val,
    state: this.ForecastData.forecast.roadState[idx],
    // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
    name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
  }
);
});
precipRateData.chartGradient = this.setBackgroundGradientConfigsPrecipRate(precipRateData.displayData[0].series)

this.Charts.push(precipRateData);

let snowDepthData = {
  name: "Snow Depth",
  displayData:[
  {name: 'Snow Depth', series: []}
],
chartGradient: [],
YtickFormat: this.FormatSnowDepthYAxisTicks.bind(this),
yAxisTicks:  [0,1,2,3,4],
yScaleMax: 4,
yScaleMin:0,
yUnits:this.precipMeasurment,
formatTooltip: true,
tooltipFormatting: this.FormatSnowDepthYAxisTicks.bind(this),
}
this.ForecastData.forecast.snowDepth.forEach((val, idx) => {
  if( val === "NaN"  ){
    console.log("value is NaN setting to 0")
    snowDepthData.displayData[0].series.push(
      {   
        value: 0,
        // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
        name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
      }
    );
  }
  else{
    snowDepthData.displayData[0].series.push(
      {   
        value: val,
        // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
        name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
      }
    );
  }
});
snowDepthData.chartGradient = this.setBackgroundGradientConfigsSnowDepth(snowDepthData.displayData[0].series)

this.Charts.push(snowDepthData);

    // console.log('DATA AFTER CONVERT: ', this.Charts);


    // this.ChartData = [
    //   {
    //     name: 'Air Temp',
    //     series: [
    //       {
    //         value: 33,
    //         name: new Date('2020-01-13T12:05:00.000Z'),
    //       },
    //       {
    //         value: 35,
    //         name: new Date('2020-01-13T12:10:00.000Z')
    //       },
    //       {
    //         value: 34,
    //         name: new Date('2020-01-13T12:15:00.000Z')
    //       },
    //       {
    //         value: 31,
    //         name: new Date('2020-01-13T12:20:00.000Z')
    //       },
    //       {
    //         value: 28,
    //         name: new Date('2020-01-13T12:25:00.000Z')
    //       },
    //       {
    //         value: 30,
    //         name: new Date('2020-01-13T12:30:00.000Z')
    //       },
    //       {
    //         value: 32,
    //         name: new Date('2020-01-13T12:35:00.000Z')
    //       },
    //       {
    //         value: 34,
    //         name: new Date('2020-01-13T12:40:00.000Z')
    //       },
    //       {
    //         value: 37,
    //         name: new Date('2020-01-13T12:45:00.000Z')
    //       },
    //       {
    //         value: 40,
    //         name: new Date('2020-01-13T12:50:00.000Z')
    //       }
    //     ]
    //   },
    //   {
    //     name: 'Road Surface Temp',
    //     series: [
    //       {
    //         value: 24,
    //         name: new Date('2020-01-13T12:05:00.000Z')
    //       },
    //       {
    //         value: 25,
    //         name: new Date('2020-01-13T12:10:00.000Z')
    //       },
    //       {
    //         value: 24,
    //         name: new Date('2020-01-13T12:15:00.000Z')
    //       },
    //       {
    //         value: 22,
    //         name: new Date('2020-01-13T12:20:00.000Z')
    //       },
    //       {
    //         value: 20,
    //         name: new Date('2020-01-13T12:25:00.000Z')
    //       },
    //       {
    //         value: 23,
    //         name: new Date('2020-01-13T12:30:00.000Z')
    //       },
    //       {
    //         value: 24,
    //         name: new Date('2020-01-13T12:35:00.000Z')
    //       },
    //       {
    //         value: 27,
    //         name: new Date('2020-01-13T12:40:00.000Z')
    //       },
    //       {
    //         value: 29,
    //         name: new Date('2020-01-13T12:45:00.000Z')
    //       },
    //       {
    //         value: 32,
    //         name: new Date('2020-01-13T12:50:00.000Z')
    //       }
    //     ]
    //   }
    // ];
  }
  protected determineRoadState(roadState: any){
    let state: number;
    switch (roadState) {
      case 'Dry':
        state = 0;
        break;
      case 'Wet':
        state = 1;
        break;
      case 'Freezing Rain':
        state = 2;
        break;
      case 'Snow':
        state = 3;
        break;
      case 'Snow and Ice':
        state = 4;
        break;
      case 'Freezing Rain and Ice':
        state = 5;
        break;
      case 'Ice':
        state = 6;
        break;
      case 'Hail and Ice':
        state = 7;
        break;
      case 'Hail':
        state = 8;
        break;
      default:
        // console.log("data doesnt exist");
        break;
    }
    return state;
  }

}

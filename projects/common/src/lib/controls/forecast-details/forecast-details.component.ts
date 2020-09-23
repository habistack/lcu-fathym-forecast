import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TemperaturePlot } from '../plots/temperature-plot/temperature-plot';
import { PotentialRoadStatePlot } from '../plots/potential-road-state_plot/potential-road-state-plot';
import { PotentialDelayRiskPlot } from '../plots/potential-delay-risk-plot/potential-delay-risk-plot';
import { CrosswindPlot } from '../plots/crosswind-plot/crosswind-plot';
import { PrecipitationPlot } from '../plots/precipitation-plot/precipitation-plot';
import { SnowDepthPlot } from '../plots/snow-depth-plot/snow-depth-plot';
import { WindPlot } from '../plots/wind-plot/wind-plot';
import { TemperatureConversion } from '@lcu/common';
import * as shape from 'd3-shape';
import { DateFormatModel, colorSets, ViewDimensions } from '@lowcodeunit/lcu-charts-common';
import { ForecastDataService} from '../forecast-data.service';

@Component({
  selector: 'lcu-forecast-details',
  templateUrl: './forecast-details.component.html',
  styleUrls: ['./forecast-details.component.css']
})
export class ForecastDetailsComponent implements OnInit {

  public ValidTimes;
  public PlotConfigs;
  public SelectedUnitSystem;
  public RouteDisplayName;
 
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
  public speedMeasurement: string ='mph';
  // public weatherData: any[];
  public xAxisLabel: string = 'Time';
  public xScaleMax: any;
  public xScaleMin: any;
  public yAxisLabel: string = 'Temperature (F)';
  public backgroundGradientConfigs: any[] = [];
  public showPercentage: boolean = false;
  public xAxisIsDate: boolean = true;
  public ManualHover: any;
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
  public dims: ViewDimensions= {width:300, height: 200, xOffset:80};

  private colorSets: any;
  private curveType: string = 'Linear';
  private fitContainer: boolean = false;
  private height: number = 300;
  private width: number = 400;

  public ChartData: any = [];


  constructor(
    protected notificationService: NotificationService,
    protected forecastDataService: ForecastDataService,
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    protected dialogRef: MatDialogRef<ForecastDetailsComponent>
  ) {
    Object.assign(this, {
      colorSets,
    });
    this.setColorScheme('cool');
    this.setForecastData();
  }

  ngOnInit() {
    
    this.curve = this.forecastDataService.getCurve(this.curveType);

    if (!this.fitContainer) {
      this.applyDimensions();
    }

  }

  private setColorScheme(name: string): void {
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }

  private applyDimensions(): void {
    this.view = [this.width, this.height];
  }

  public CloseModal() {
    this.dialogRef.close();
  }

  public ToggleMeasurementUnit(val) {
    this.SelectedUnitSystem = val;

    if (this.SelectedUnitSystem === 'Metric') {
      this.setForecastDataToMetric();
    }

    if (this.SelectedUnitSystem === 'English') {
      this.setForecastDataToEnglish();
    }
  }

  public hoveredVerticalChange(e) {
    // console.log('message from tooltip - the x value hover has changed to: ', e)
    this.ManualHover = e;
    // now send it back to the tooltip to manually show that vertical line
  }

  public onHoverChange(e) {
    this.ManualHover = e;
    // console.log('on hover change...: ', e)
    this.ManualHover = e;
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


  protected setForecastData() {
    this.ForecastData = { forecast: this.passedData.allData.forecast, points: this.passedData.allData.points };
    // this.ValidTimes = [];
    // this.passedData.allData.points.forEach(x => {
    //   this.ValidTimes.push(x.absoluteSeconds);
    // });
    console.log(this.ForecastData);
    this.RouteDisplayName = this.passedData.allData.displayName;
    this.setInitialDataToMetric();
  }

  protected setInitialDataToMetric() {
    this.SelectedUnitSystem = 'Metric';
    // temp data comes in Fahrenheit but everything else comes in metric, so initally, set the outlier to metric
    this.ForecastData.forecast.surfaceTemperature = this.ForecastData.forecast.surfaceTemperature.map(x => {
      return this.forecastDataService.convertFtoC(x);
    });
    this.ForecastData.forecast.roadTemperature = this.ForecastData.forecast.roadTemperature.map(x => {
      return this.forecastDataService.convertFtoC(x);
    });

    this.Charts = this.forecastDataService.BuildCharts(this.ForecastData, "Metric");
  }



//     this.Charts = new Array<any>();
//     // console.log(this.ForecastData);
//     let roadTempChartData = {
//       name: "Road Temperature",
//       displayData:[
//         {name: 'Surface Temp', series: []},
//         {name: 'Road Temp', series: []}
//       ],
//       chartGradient: [],
//       YtickFormat: this.FormatTempYAxisTicks.bind(this),
//       yAxisTicks:  [0,30,70,100,120],
//       yScaleMax:120,
//       yScaleMin:0,
//       yUnits:'\u00B0',
     
//     }
//     this.ForecastData.forecast.surfaceTemperature.forEach((temp, idx) => {

//       roadTempChartData.displayData[0].series.push(
//         {
//           value: Math.round(TemperatureConversion.KelvinToFahrenheit(temp)),
//           name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
//         }
//       );
//     });
//     this.ForecastData.forecast.roadTemperature.forEach((temp, idx) => {
//       roadTempChartData.displayData[1].series.push(
//         {
//           value: Math.round(TemperatureConversion.KelvinToFahrenheit(temp)),
//           name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
//         }
//       );
//     });
//     roadTempChartData.chartGradient = this.setBackgroundGradientConfigsTemp(roadTempChartData.displayData[0].series)
//     debugger
//     this.Charts.push(roadTempChartData);
//     debugger
//     let roadChartData = {
//       name: "Road State",
//       displayData:[
//       {name: 'Road State', series: []}
//     ],
//     chartGradient: [],
//     YtickFormat: this.FormatRoadStateYAxisTicks.bind(this),
//     yAxisTicks:  [0,1,3,6,8],
//     yScaleMax: 8,
//     yScaleMin:0,
//     yUnits:'',
//     formatTooltip: true,
//     tooltipFormatting: this.FormatRoadStateYAxisTicks.bind(this)

//   }
//     this.ForecastData.forecast.roadState.forEach((state, idx) => {
//       roadChartData.displayData[0].series.push(
//         {
//           value: this.determineRoadState(state),
//           // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
//           name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
//         }
//       );
//     });
//     roadChartData.chartGradient = this.setBackgroundGradientConfigsRoadState(roadChartData.displayData[0].series)

//     this.Charts.push(roadChartData);

//     let delayRiskData = {
//       name: "Potential Delay Risk",
//       displayData:[
//       {name: 'Potential Delay Risk', series: []}
//     ],
//     chartGradient: [],
//     YtickFormat: this.FormatDelayRiskYAxisTicks.bind(this),
//     yAxisTicks:  [0,1,2,3,4,5,6],
//     yScaleMax: 6,
//     yScaleMin:0,
//     yUnits:'',
//     formatTooltip: true,
//     tooltipFormatting: this.FormatDelayRiskTooltip.bind(this),

//   }
//   this.ForecastData.forecast.routeDelayRisk.forEach((state, idx) => {
//     delayRiskData.displayData[0].series.push(
//       {
//         value: state,
//         // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
//         name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
//       }
//     );
//   });
//   delayRiskData.chartGradient = this.setBackgroundGradientConfigsDelayRisk(delayRiskData.displayData[0].series)

//   this.Charts.push(delayRiskData);

//   let crosswindRiskData = {
//     name: "Crosswind Risk",
//     displayData:[
//     {name: 'Crosswind Risk', series: []}
//   ],
//   chartGradient: [],
//   YtickFormat: this.FormatCrosswindRiskYAxisTicks.bind(this),
//   yAxisTicks:  [0.0,0.5,1.0,1.5,2.0],
//   yScaleMax: 2,
//   yScaleMin:0,
//   formatTooltip: true,
//   tooltipFormatting: this.FormatCrosswindRiskYAxisTicks.bind(this)


// }
// this.ForecastData.forecast.crosswindRisk.forEach((state, idx) => {
//   crosswindRiskData.displayData[0].series.push(
//     {
//       value: state,
//       // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
//       name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
//     }
//   );
// });
// crosswindRiskData.chartGradient = this.setBackgroundGradientConfigsCrosswindRisk(crosswindRiskData.displayData[0].series)

// this.Charts.push(crosswindRiskData);

// //PRECIP RATE

// let precipRateData = {
//   name: "Precipitation Rate",
//   displayData:[
//   {name: 'Precipitation Rate', series: []}
// ],
// chartGradient: [],
// YtickFormat: this.FormatPrecipitationRateYAxisTicks.bind(this),
// yAxisTicks:  [0.0,0.25,0.50,0.75,1.0],
// yScaleMax: 1,
// yScaleMin:0,
// yUnits:this.precipMeasurmentPerHour,
// formatTooltip: true,
// tooltipFormatting: this.FormatPrecipitationRateYAxisTicks.bind(this),
// }
// this.ForecastData.forecast.precipitationRate.forEach((val, idx) => {
// precipRateData.displayData[0].series.push(
//   {
//     value: val,
//     state: this.ForecastData.forecast.roadState[idx],
//     // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
//     name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
//   }
// );
// });
// precipRateData.chartGradient = this.setBackgroundGradientConfigsPrecipRate(precipRateData.displayData[0].series)

// this.Charts.push(precipRateData);

// let snowDepthData = {
//   name: "Snow Depth",
//   displayData:[
//   {name: 'Snow Depth', series: []}
// ],
// chartGradient: [],
// YtickFormat: this.FormatSnowDepthYAxisTicks.bind(this),
// yAxisTicks:  [0,1,2,3,4],
// yScaleMax: 4,
// yScaleMin:0,
// yUnits:this.precipMeasurment,
// formatTooltip: true,
// tooltipFormatting: this.FormatSnowDepthYAxisTicks.bind(this),
// }
// this.ForecastData.forecast.snowDepth.forEach((val, idx) => {
//   if( val === "NaN"  ){
//     console.log("value is NaN setting to 0")
//     snowDepthData.displayData[0].series.push(
//       {   
//         value: 0,
//         // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
//         name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
//       }
//     );
//   }
//   else{
//     snowDepthData.displayData[0].series.push(
//       {   
//         value: val,
//         // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
//         name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
//       }
//     );
//   }
// });
// snowDepthData.chartGradient = this.setBackgroundGradientConfigsSnowDepth(snowDepthData.displayData[0].series)

// this.Charts.push(snowDepthData);


// let windSpeedData = {
//   name: "Wind Speed",
//   displayData:[
//   {name: 'Wind Speed', series: []}
// ],
// chartGradient: [],
// YtickFormat: this.FormatWindSpeedYAxisTicks.bind(this),
// yAxisTicks:  [0,25,50,75,100, 125, 150],
// yScaleMax: 150,
// yScaleMin:0,
// yUnits: this.speedMeasurement,

// }
// this.ForecastData.forecast.windSpeed.forEach((val, idx) => {
//   // if( val === "NaN"  ){
//   //   console.log("value is NaN setting to 0")
//   //   snowDepthData.displayData[0].series.push(
//   //     {   
//   //       value: 0,
//   //       // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
//   //       name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
//   //     }
//   //   );
//   // }
//   // else{
//     windSpeedData.displayData[0].series.push(
//       {   
//         value: Math.round(val),
//         // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
//         name: new Date(this.ForecastData.points[idx].absoluteSeconds * 1000)
//       }
//     );
//   // }
// });
// windSpeedData.chartGradient = this.setBackgroundGradientConfigsWindSpeed(windSpeedData.displayData[0].series)

// this.Charts.push(windSpeedData);
//   }

  // protected determineRoadState(roadState: any){
  //   let state: number;
  //   switch (roadState) {
  //     case 'Dry':
  //       state = 0;
  //       break;
  //     case 'Wet':
  //       state = 1;
  //       break;
  //     case 'Freezing Rain':
  //       state = 2;
  //       break;
  //     case 'Snow':
  //       state = 3;
  //       break;
  //     case 'Snow and Ice':
  //       state = 4;
  //       break;
  //     case 'Freezing Rain and Ice':
  //       state = 5;
  //       break;
  //     case 'Ice':
  //       state = 6;
  //       break;
  //     case 'Hail and Ice':
  //       state = 7;
  //       break;
  //     case 'Hail':
  //       state = 8;
  //       break;
  //     default:
  //       // console.log("data doesnt exist");
  //       break;
  //   }
  //   return state;
  // }

  // protected FormatTempYAxisTicks(value: any) {
    
  //   if (value <= 0) {
  //     return "Freezing";
  //   }
  //   if (value > 0 && value <= 32) {
  //     return "Cold";
  //   }
  //   if (value > 32 && value <= 50) {
  //     return "Cool"
  //   }
      
  //   if (value > 50 && value <= 70) {
  //     return "Warm";
  //   }
  //   if (value > 70 && value <=100) {
  //     return "Hot";
  //   }
  //   if(value > 100){
  //     return "Very Hot"
  //   }
  // }

  
  // protected FormatRoadStateYAxisTicks(val: any) {
  //   if (val === 0) { return "Dry"; }
  //   if (val === 1) { return "Wet"; }
  //   if (val === 2) { return "Freezing Rain"; }
  //   if (val === 3) { return "Snow"; }
  //   if (val === 4) { return "Snow & Ice"; }
  //   if (val === 5) { return "Freezing Rain & Ice"; }
  //   if (val === 6) { return "Ice"; }
  //   if (val === 7) { return "Hail & Ice"; }
  //   if (val === 8) { return "Hail"; }
  // }

  // protected FormatDelayRiskYAxisTicks(val: any) {
  //   val = Math.round(val);
  //   if (val === 0.0) { return "None"; }
  //   if (val === 1.0) { return "Normal"; }
  //   if (val === 2.0) { return "Slight"; }
  //   if (val === 3.0) { return "Moderate"; }
  //   if (val === 4.0) { return "Heavy"; }
  //   if (val === 5.0) { return "Severe"; }
  //   if (val === 6.0) { return "Extreme"; }
  // }

  // public FormatDelayRiskTooltip(val: any){
  //   if (val >= 0 && val < 1) { return "None"; }
  //   if (val >= 1 && val < 2) { return "Normal"; }
  //   if (val >= 2 && val < 3) { return "Slight"; }
  //   if (val >= 3 && val < 4) { return "Moderate"; }
  //   if (val >= 4 && val < 5) { return "Heavy"; }
  //   if (val >= 5 && val < 6) { return "Severe"; }
  //   if (val >= 6) { return "Extreme"; }
  // }

  // protected FormatCrosswindRiskYAxisTicks(val: any){
  //   val = Math.floor(val*2)/2;
  //   if (val === 0.0) { return "Low"; }
  //   if (val === 0.50) { return "Slight"; }
  //   if (val === 1.0) { return "Moderate"; }
  //   if (val === 1.5) { return "High"; }
  //   if (val === 2.0) { return "Severe"; }
  // }

  // public FormatCrosswindRiskTooltip(val: any){
  //   if (val >= 0 && val < 0.50) { return "Low"; }
  //   if (val >= 0.50 && val < 1.0) { return "Slight"; }
  //   if (val >= 1.0 && val < 1.5) { return "Moderate"; }
  //   if (val >= 1.5 && val < 2.0) { return "High"; }
  //   if (val >= 2.0) { return "Severe"; }
  // }

  // protected FormatPrecipitationRateYAxisTicks(val: any){
  //   return val + " " + this.precipMeasurmentPerHour;
  // }


  // protected FormatSnowDepthYAxisTicks(val: any){
  //   return val + " " + this.precipMeasurment;

  // }

  // protected FormatWindSpeedYAxisTicks(val: any){
  //   return val +  " " + this.speedMeasurement;
  // }


  // protected setBackgroundGradientConfigsTemp(backgroundMarker: any) {
    
  //   let backgroundGradient = new Array<any>();

  //   backgroundMarker.forEach((ser, idx) => {
  //     const idxPercentage = idx * 100 / backgroundMarker.length;
  //     if (ser.value > 95) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: 'red'
  //       });
  //     } else if (ser.value > 85) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: 'yellow'
  //       });
  //     } 
  //     else if (ser.value > 32) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: 'green'
  //       });
  //     }else {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: 'blue'
  //       });
  //     }
  //   });
  //   return backgroundGradient;
  // }

  // protected setBackgroundGradientConfigsRoadState(backgroundMarker: any) {
    
  //   let backgroundGradient = new Array<any>();

  //   backgroundMarker.forEach((ser, idx) => {
  //     const idxPercentage = idx * 100 / backgroundMarker.length;
  //     if (ser.value === 0) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#ffffff'
  //       });
  //     } else if (ser.value ===1 ) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#00dd00'
  //       });
  //     } 
  //     else if (ser.value === 2) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#669866'
  //       });
  //     }
  //     else if (ser.value === 3) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#b760b7'
  //       });
  //     }else if (ser.value === 4) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#8C338F'
  //       });
  //     }else if (ser.value === 5) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#9F45A5'
  //       });
  //     }else if (ser.value === 6) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#6F0475'
  //       });
  //     }else if (ser.value === 7) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#80044B'
  //       });
  //     }else if (ser.value === 8) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#008888'
  //       });
  //     }else {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: 'grey'
  //       });
  //     }
  //   });
  //   // console.log("color configs", backgroundGradient)
  //   return backgroundGradient;
  // }

  // protected setBackgroundGradientConfigsDelayRisk(backgroundMarker: any) {
  //   // console.log("weather data:", this.weatherData)
  //   // console.log("scheme:", this.schemeType)
  //   let backgroundGradient = new Array<any>();

  //   // const backgroundMarker = this.ChartData[0].series;

  //   backgroundMarker.forEach((ser, idx) => {
  //     // console.log("delay risk: ", ser)
  //     const idxPercentage = idx * 100 / backgroundMarker.length;
  //     if (ser.value === 0 || ser.value <1) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#00dd00'
  //       });
  //     } 
  //     else if (ser.value >= 1 && ser.value < 2) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#bffc05'
  //       });
  //     }else if (ser.value >= 2 && ser.value < 3) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#ffff00'
  //       });
      
  //     }else if (ser.value >= 3 && ser.value < 4) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#fcb205'
  //       });
      
  //     }
  //     else if (ser.value >= 4 && ser.value < 5) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#ff0000'
  //       });
      
  //     }else if (ser.value >= 5) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#6e000'
  //       });
  //     }else {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: 'grey'
  //       });
  //     }
  //   });
  //   return backgroundGradient;
  // }

  // protected setBackgroundGradientConfigsCrosswindRisk(backgroundMarker: any){
  //   let backgroundGradient = new Array<any>();

  //   backgroundMarker.forEach((ser, idx) => {
  //     const idxPercentage = idx * 100 / backgroundMarker.length;
  //     if (ser.value === 0 || ser.value <.50) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#0d0' //green
  //       });
  //     } 
  //     else if (ser.value >= .50 && ser.value < 1.00) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#87ef00' //yellow-green
  //       });
  //     }else if (ser.value > 1.00 && ser.value < 1.50 ) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#ff0' //yellow
  //       });
  //     }else if (ser.value > 1.50 && ser.value < 2.00 ) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#ff9900' //orange
  //       });
  //     }else {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: 'ff0000' //red
  //       });
  //     }
  //   });
  //   return backgroundGradient;
  // }

  // protected setBackgroundGradientConfigsPrecipRate(backgroundMarker: any){
  //   let backgroundGradient = new Array<any>();

  //   backgroundMarker.forEach((ser, idx) => {
  //     const idxPercentage = idx * 100 / backgroundMarker.length;

  //     if (ser.value === null || !ser.value) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#ffffff' //grey
  //       });
  //     }
  
  //     if (ser.state === "Dry") {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#ffffff' //white
  //       });
  //     } else if (ser.state === "Wet" || ser.state === "Freezing Rain") { //rain or freezing rain
  //       if (ser.value > 0 && ser.value < 0.5) {
  //         backgroundGradient.push({
  //           offset: idxPercentage,
  //           color: '#00dd00' //green
  //         });
  //       } else if (ser.value >= 0.5 && ser.value < 0.75) {
  //         backgroundGradient.push({
  //           offset: idxPercentage,
  //           color: '#ffff00' //yellow
  //         });
  //       } else if (ser.value >= 0.75) {
  //         backgroundGradient.push({
  //           offset: idxPercentage,
  //           color: '#ff0000' // red
  //         });
  //       }
  //     } else if (ser.value === "Snow" || ser.value === "Snow and Ice" ||ser.value === "Freezing Rain and Ice" || ser.value === "Ice") {
  //       if (ser.value > 0 && ser.value < 0.5) {
  //         backgroundGradient.push({
  //           offset: idxPercentage,
  //           color: '#d68dd6' //light purple
  //         });
  //       } else if (ser.value >= 0.5 && ser.value < 0.75) {
  //         backgroundGradient.push({
  //           offset: idxPercentage,
  //           color: '#873b87' //purple
  //         });
  //       } else if (ser.value >= 0.75) {
  //         backgroundGradient.push({
  //           offset: idxPercentage,
  //           color: '#700470' //dark purple
  //         });
  //       }
  //     } else {// hail and ice or hail
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#800a01' //dark red
  //       });
  //     }

  //   });
  //   return backgroundGradient;
  // }

  // public setBackgroundGradientConfigsSnowDepth(backgroundMarker: any){
  //   let backgroundGradient = new Array<any>();

  //   backgroundMarker.forEach((ser, idx) => {
  //     const idxPercentage = idx * 100 / backgroundMarker.length;

  //   if(ser.val === null){
  //     backgroundGradient.push({
  //       offset: idxPercentage,
  //       color: '#d8d8d8'
  //     });
  //   }
  //     else if (ser.value < 2 ) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#0d0'
  //       });
  //     } 
  //     else if (ser.value >= 2 && ser.value <= 4) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#b760b7'
  //       });
  //     }else if (ser.value > 4 ) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#0000dd'
  //       });
  //     }else {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: 'white'
  //       });
  //     }
  //   });
  //   return backgroundGradient;
  // }

  // public setBackgroundGradientConfigsWindSpeed(backgroundMarker: any){
  //   let backgroundGradient = new Array<any>();

  //   backgroundMarker.forEach((ser, idx) => {
  //     const idxPercentage = idx * 100 / backgroundMarker.length;

  //   if(ser.val === null){
  //     backgroundGradient.push({
  //       offset: idxPercentage,
  //       color: '#d8d8d8'
  //     });
  //   }
  //     else if (ser.value < 25 ) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#0d0'
  //       });
  //     } 
  //     else if (ser.value >= 25 && ser.value <= 50) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#ffff00'
  //       });
  //     }else if (ser.value > 50 ) {
  //       backgroundGradient.push({
  //         offset: idxPercentage,
  //         color: '#ff0000'
  //       });
  //     }
  //   });
  //   return backgroundGradient;
  // }

  protected setForecastDataToMetric() {
    this.ForecastData.forecast.surfaceTemperature = this.ForecastData.forecast.surfaceTemperature.map(x => {
      return this.forecastDataService.convertFtoC(x);
    });
    this.ForecastData.forecast.roadTemperature = this.ForecastData.forecast.roadTemperature.map(x => {
      return this.forecastDataService.convertFtoC(x);
    });
    this.ForecastData.forecast.precipitationRateMillisHr = this.ForecastData.forecast.precipitationRateMillisHr.map(x => {
      return this.forecastDataService.convertINtoMM(x);
    });
    this.ForecastData.forecast.windSpeed = this.ForecastData.forecast.windSpeed.map(x => {
      return this.forecastDataService.convertMlPHourToMePSec(x);
    });
    this.ForecastData.forecast.snowDepth = this.ForecastData.forecast.snowDepth.map(x => {
      return this.forecastDataService.convertINToM(x);
    });

    this.Charts = this.forecastDataService.BuildCharts(this.ForecastData, "Metric");
  }

  protected setForecastDataToEnglish() {
    this.ForecastData.forecast.surfaceTemperature = this.ForecastData.forecast.surfaceTemperature.map(x => {
      return this.forecastDataService.convertCtoF(x);
    });
    this.ForecastData.forecast.roadTemperature = this.ForecastData.forecast.roadTemperature.map(x => {
      return this.forecastDataService.convertCtoF(x);
    });
    this.ForecastData.forecast.precipitationRateMillisHr = this.ForecastData.forecast.precipitationRateMillisHr.map(x => {
      return this.forecastDataService.convertMMtoIN(x);
    })
    this.ForecastData.forecast.windSpeed = this.ForecastData.forecast.windSpeed.map(x => {
      return this.forecastDataService.convertMePSecToMlPHour(x);
    });
    this.ForecastData.forecast.snowDepth = this.ForecastData.forecast.snowDepth.map(x => {
      return this.forecastDataService.convertMToIN(x);
    });

    this.Charts = this.forecastDataService.BuildCharts(this.ForecastData, "English");

    // this.PlotConfigs = [
    //   new TemperaturePlot('F', 'Forecast'), // add english measurements to end
    //   new PotentialRoadStatePlot(null, 'Forecast'),
    //   new PotentialDelayRiskPlot(null, 'Forecast'),
    //   new CrosswindPlot(null, 'Forecast'),
    //   new PrecipitationPlot('in', 'Forecast', 'in'),
    //   new SnowDepthPlot('in', 'Forecast', 'in'),
    //   new WindPlot('mph', 'Forecast', 'mph'),
    // ];
  }

  public ExportToJson() {
    const objectData = this.passedData.allData;
    const filename = 'forecast_data.json';
    const contentType = 'application/json;charset=utf-8;';
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      const blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  // protected convertFtoC(val) {
  //   const newVal = (val - 32) * 5 / 9;
  //   return newVal;
  // }

  // protected convertCtoF(val) {
  //   const newVal = val * 9 / 5 + 32;
  //   return newVal;
  // }

  // protected convertINtoMM(val) {
  //   return val * 25.4;
  // }

  // protected convertMMtoIN(val) {
  //   return val * 0.03937008;
  // }

  // protected convertMlPHourToMePSec(val) {
  //   return val === 0 ? 0 : val / 2.237;
  // }

  // protected convertMePSecToMlPHour(val) {
  //   return val * 2.237;
  // }

  // protected convertINToM(val) {
  //   return val === 0 ? 0 : val / 39.37;
  // }

  // protected convertMToIN(val) {
  //   return val * 39.37;
  // }

}

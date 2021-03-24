import { Injectable } from '@angular/core';
import { TemperatureConversion } from '@lcu/common';
import * as shape from 'd3-shape';

@Injectable({
  providedIn: 'root'
})
export class ForecastPlotsService {

  private curves = {
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

  public Charts: Array<any>;

  protected speedMeasurement: string;
  protected precipMeasurement: string;
  protected precipMeasurementPerHour: string;
  protected forecastDetailsMeasurement: string;
  protected tempMeasurement: string;

  

  constructor() { }

  protected setMetricMeasurements(){
    this.speedMeasurement = 'km/hr';
    this.precipMeasurement = 'mm';
    this.precipMeasurementPerHour = 'mm/hr';
    this.tempMeasurement = 'C';
    this.SetForecastDetailsMeasurement("Metric");


  }

  protected setEnglishMeasurements(){
    this.speedMeasurement = 'mph';
    this.precipMeasurement = 'in';
    this.precipMeasurementPerHour = 'in/hr';
    this.tempMeasurement = 'F';
    this.SetForecastDetailsMeasurement("English");
  }

  public SetForecastDetailsMeasurement(msr: string){
    this.forecastDetailsMeasurement = msr;
  }

  public GetForecastDetailsMeasurement(){
    return this.forecastDetailsMeasurement;
  }

  public getCurve(curveType){
    return this.curves[curveType];
  }
  
  public getSpeedMeasurement(){
    return this.speedMeasurement;
  }

  public getPrecipMeasurement(){
    return this.precipMeasurement;
  }

  public getPrecipMeasurementPerHour(){
    return this.precipMeasurementPerHour;
  }

  public getTempMeasurements(){
    return this.tempMeasurement;
  }

  public convertFtoC(val) {
    const newVal = (val - 32) * 5 / 9;
    return newVal;
  }

  public convertCtoF(val) {
    const newVal = val * 9 / 5 + 32;
    return newVal;
  }

  public convertINtoMM(val) {
    return val * 25.4;
  }

  public convertMMtoIN(val) {
    return val * 0.03937008;
  }

  public convertMlPHourToMePSec(val) {
    return val === 0 ? 0 : val / 2.237;
  }

  public convertMePSecToMlPHour(val) {
    return val * 2.237;
  }

  public convertINToM(val) {
    return val === 0 ? 0 : val / 39.37;
  }

  public convertMToIN(val) {
    return val * 39.37;
  }

  public BuildCharts(ForecastData: any, Measurement: string): Array<any>{
    if(Measurement === "Metric"){
      this.setMetricMeasurements();
    }
    else if(Measurement === "English"){
      this.setEnglishMeasurements();
    }
    this.Charts = new Array<any>();
    // console.log(this.ForecastData);
    let roadTempChartData = {
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
      yUnits: '\u00B0' + this.tempMeasurement,
     
    }
    ForecastData.forecast.surfaceTemperature.forEach((temp, idx) => {
      
      roadTempChartData.displayData[0].series.push(
        {
          value: Math.round(temp),
          name: new Date(ForecastData.points[idx].absoluteSeconds * 1000)
        }
      );
     
    });
    ForecastData.forecast.roadTemperature.forEach((temp, idx) => {
     
      roadTempChartData.displayData[1].series.push(
        {
          value: Math.round(temp),
          name: new Date(ForecastData.points[idx].absoluteSeconds * 1000)
        }
      );
    });
  
    roadTempChartData.chartGradient = this.setBackgroundGradientConfigsTemp(roadTempChartData.displayData[0].series)
    // console.log("roadtemp chart grad: ", roadTempChartData.chartGradient)
    this.Charts.push(roadTempChartData);
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
    ForecastData.forecast.roadState.forEach((state, idx) => {
      roadChartData.displayData[0].series.push(
        {
          value: this.determineRoadState(state),
          name: new Date(ForecastData.points[idx].absoluteSeconds * 1000)
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
  ForecastData.forecast.routeDelayRisk.forEach((state, idx) => {
    delayRiskData.displayData[0].series.push(
      {
        value: state,
        name: new Date(ForecastData.points[idx].absoluteSeconds * 1000)
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
  yAxisTicks:  [0,0.5,1,1.5,2],
  yScaleMax: 2,
  yScaleMin:0,
  formatTooltip: true,
  tooltipFormatting: this.FormatCrosswindRiskYAxisTicks.bind(this)


}
ForecastData.forecast.crosswindRisk.forEach((state, idx) => {
  crosswindRiskData.displayData[0].series.push(
    {
      value: state,
      name: new Date(ForecastData.points[idx].absoluteSeconds * 1000)
    }
  );
});
crosswindRiskData.chartGradient = this.setBackgroundGradientConfigsCrosswindRisk(crosswindRiskData.displayData[0].series)

this.Charts.push(crosswindRiskData);

let precipRateData = {
  name: "Precipitation Rate",
  displayData:[
  {name: 'Precipitation Rate', series: []}
],
chartGradient: [],
YtickFormat: this.FormatPrecipitationRateYAxisTicks.bind(this),
yAxisTicks:  [0,.25,.5,.75,1],
yScaleMax: 1,
yScaleMin:0,
yUnits:this.precipMeasurementPerHour
}
ForecastData.forecast.precipitationRate.forEach((val, idx) => {
precipRateData.displayData[0].series.push(
  {
    value: val,
    state: ForecastData.forecast.roadState[idx],
    name: new Date(ForecastData.points[idx].absoluteSeconds * 1000)
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
yUnits:this.precipMeasurement
}
ForecastData.forecast.snowDepth.forEach((val, idx) => {
  if( val === "NaN"  ){
    console.log("value is NaN setting to 0")
    snowDepthData.displayData[0].series.push(
      {   
        value: 0,
        name: new Date(ForecastData.points[idx].absoluteSeconds * 1000)
      }
    );
  }
  else{
    snowDepthData.displayData[0].series.push(
      {   
        value: val,
        // name: new Date(this.ForecastData.points[idx].absoluteSeconds)
        name: new Date(ForecastData.points[idx].absoluteSeconds * 1000)
      }
    );
  }
});
snowDepthData.chartGradient = this.setBackgroundGradientConfigsSnowDepth(snowDepthData.displayData[0].series)

this.Charts.push(snowDepthData);


let windSpeedData = {
  name: "Wind Speed",
  displayData:[
  {name: 'Wind Speed', series: []}
],
chartGradient: [],
YtickFormat: this.FormatWindSpeedYAxisTicks.bind(this),
yAxisTicks:  [0,25,50,75,100, 125, 150],
yScaleMax: 150,
yScaleMin:0,
yUnits: this.speedMeasurement,

}
ForecastData.forecast.windSpeed.forEach((val, idx) => {
  
    windSpeedData.displayData[0].series.push(
      {   
        value: Math.round(val),
        name: new Date(ForecastData.points[idx].absoluteSeconds * 1000)
      }
    );
});
windSpeedData.chartGradient = this.setBackgroundGradientConfigsWindSpeed(windSpeedData.displayData[0].series)

this.Charts.push(windSpeedData);

return this.Charts;
  
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
    if (val >= 0 && val < 0.50) { return "Low"; }
    if (val >= 0.50 && val < 1.0) { return "Slight"; }
    if (val >= 1.0 && val < 1.5) { return "Moderate"; }
    if (val >= 1.5 && val < 2.0) { return "High"; }
    if (val >= 2.0) { return "Severe"; }
  }

  protected FormatPrecipitationRateYAxisTicks(val: any){
    return val;
  }


  protected FormatSnowDepthYAxisTicks(val: any){
    return val;

  }

  protected FormatWindSpeedYAxisTicks(val: any){
    return val;
  }


  protected setBackgroundGradientConfigsTemp(backgroundMarker: any) {
    
    let backgroundGradient = new Array<any>();

    backgroundMarker.forEach((ser, idx) => {
      const idxPercentage = idx * 100 / backgroundMarker.length;
      if (ser.value > 95) {
        backgroundGradient.push({
          offset: idxPercentage,
          index: idx,
          color: 'red'
        });
      } else if (ser.value > 85) {
        backgroundGradient.push({
          offset: idxPercentage,
          index: idx,
          color: 'yellow'
        });
      } 
      else if (ser.value > 32) {
        backgroundGradient.push({
          offset: idxPercentage,
          index: idx,
          color: 'green'
        });
      }else {
        backgroundGradient.push({
          offset: idxPercentage,
          index: idx,
          color: 'blue'
        });
      }
    });
    // console.log("Temps backgroundGradient: ", backgroundGradient)
    // console.log("Temps backgroundMarker: ", backgroundMarker)

    return backgroundGradient;
  }

  protected setBackgroundGradientConfigsRoadState(backgroundMarker: any) {
    
    let backgroundGradient = new Array<any>();

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
    return backgroundGradient;
  }

  protected setBackgroundGradientConfigsCrosswindRisk(backgroundMarker: any){
    let backgroundGradient = new Array<any>();

    backgroundMarker.forEach((ser, idx) => {
      const idxPercentage = idx * 100 / backgroundMarker.length;
      if (ser.value === 0 || ser.value <.50) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#0d0' //green
        });
      } 
      else if (ser.value >= .50 && ser.value < 1.00) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#87ef00' //yellow-green
        });
      }else if (ser.value > 1.00 && ser.value < 1.50 ) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#ff0' //yellow
        });
      }else if (ser.value > 1.50 && ser.value < 2.00 ) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#ff9900' //orange
        });
      }else {
        backgroundGradient.push({
          offset: idxPercentage,
          color: 'ff0000' //red
        });
      }
    });
    return backgroundGradient;
  }

  protected setBackgroundGradientConfigsPrecipRate(backgroundMarker: any){
    let backgroundGradient = new Array<any>();

    backgroundMarker.forEach((ser, idx) => {
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

  public setBackgroundGradientConfigsWindSpeed(backgroundMarker: any){
    let backgroundGradient = new Array<any>();

    backgroundMarker.forEach((ser, idx) => {
      const idxPercentage = idx * 100 / backgroundMarker.length;

    if(ser.val === null){
      backgroundGradient.push({
        offset: idxPercentage,
        color: '#d8d8d8'
      });
    }
      else if (ser.value < 25 ) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#0d0'
        });
      } 
      else if (ser.value >= 25 && ser.value <= 50) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#ffff00'
        });
      }else if (ser.value > 50 ) {
        backgroundGradient.push({
          offset: idxPercentage,
          color: '#ff0000'
        });
      }
    });
    return backgroundGradient;
  }
}

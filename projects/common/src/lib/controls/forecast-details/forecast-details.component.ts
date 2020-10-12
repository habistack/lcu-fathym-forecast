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
import { ForecastPlotsService } from '../../services/forecast-plots.service';

@Component({
  selector: 'lcu-forecast-details',
  templateUrl: './forecast-details.component.html',
  styleUrls: ['./forecast-details.component.scss']
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
  public showLegend: boolean = true;
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
  public PlotWidth = 1000;
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
  private width: number = 1000;

  public ChartData: any = [];


  constructor(
    protected notificationService: NotificationService,
    protected forecastPlotsService: ForecastPlotsService,
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
    
    this.curve = this.forecastPlotsService.getCurve(this.curveType);

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
    console.log(this.ForecastData);
    this.RouteDisplayName = this.passedData.allData.displayName;
    this.setInitialDataToMetric();
  }

  protected setInitialDataToMetric() {
    if(this.forecastPlotsService.GetForecastDetailsMeasurement() === "English"){
      
      this.forecastPlotsService.SetForecastDetailsMeasurement(this.SelectedUnitSystem);
      // temp data comes in Fahrenheit but everything else comes in metric, so initally, set the outlier to metric
      this.ForecastData.forecast.surfaceTemperature = this.ForecastData.forecast.surfaceTemperature.map(x => {
        return this.forecastPlotsService.convertFtoC(x);
     });
      this.ForecastData.forecast.roadTemperature = this.ForecastData.forecast.roadTemperature.map(x => {
        return this.forecastPlotsService.convertFtoC(x);
      });
    }
    this.SelectedUnitSystem = 'Metric';
    this.Charts = this.forecastPlotsService.BuildCharts(this.ForecastData, "Metric");
  }
  

  protected setForecastDataToMetric() {
    this.SelectedUnitSystem = 'Metric';
    this.forecastPlotsService.SetForecastDetailsMeasurement(this.SelectedUnitSystem);
    this.ForecastData.forecast.surfaceTemperature = this.ForecastData.forecast.surfaceTemperature.map(x => {
      return this.forecastPlotsService.convertFtoC(x);
    });
    this.ForecastData.forecast.roadTemperature = this.ForecastData.forecast.roadTemperature.map(x => {
      return this.forecastPlotsService.convertFtoC(x);
    });
    this.ForecastData.forecast.precipitationRateMillisHr = this.ForecastData.forecast.precipitationRateMillisHr.map(x => {
      return this.forecastPlotsService.convertINtoMM(x);
    });
    this.ForecastData.forecast.windSpeed = this.ForecastData.forecast.windSpeed.map(x => {
      return this.forecastPlotsService.convertMlPHourToMePSec(x);
    });
    this.ForecastData.forecast.snowDepth = this.ForecastData.forecast.snowDepth.map(x => {
      return this.forecastPlotsService.convertINToM(x);
    });

    this.Charts = this.forecastPlotsService.BuildCharts(this.ForecastData, "Metric");
  }

  protected setForecastDataToEnglish() {
    this.SelectedUnitSystem = 'English';
    this.forecastPlotsService.SetForecastDetailsMeasurement(this.SelectedUnitSystem);
    this.ForecastData.forecast.surfaceTemperature = this.ForecastData.forecast.surfaceTemperature.map(x => {
      return this.forecastPlotsService.convertCtoF(x);
    });
    this.ForecastData.forecast.roadTemperature = this.ForecastData.forecast.roadTemperature.map(x => {
      return this.forecastPlotsService.convertCtoF(x);
    });
    this.ForecastData.forecast.precipitationRateMillisHr = this.ForecastData.forecast.precipitationRateMillisHr.map(x => {
      return this.forecastPlotsService.convertMMtoIN(x);
    })
    this.ForecastData.forecast.windSpeed = this.ForecastData.forecast.windSpeed.map(x => {
      return this.forecastPlotsService.convertMePSecToMlPHour(x);
    });
    this.ForecastData.forecast.snowDepth = this.ForecastData.forecast.snowDepth.map(x => {
      return this.forecastPlotsService.convertMToIN(x);
    });

    this.Charts = this.forecastPlotsService.BuildCharts(this.ForecastData, "English");

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

 
}

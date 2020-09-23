import { Component, OnInit } from '@angular/core';
import { ForecastDataModel } from '../../models/forecast-data.model';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';
import { DateFormatModel, colorSets, ViewDimensions } from '@lowcodeunit/lcu-charts-common';
import * as shape from 'd3-shape';
import { TemperatureConversion } from '@lcu/common';
import { ForecastDataService } from '../forecast-data.service';


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
  public speedMeasurement: string ='mph';
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
  // private curves: any;
  private fitContainer: boolean = false;
  private height: number = 300;
  private width: number = 400;

  public ChartData: any = [];

  protected forecastPlotDataSubsription: Subscription;

  constructor(protected notificationService: NotificationService,
    protected forecastDataService: ForecastDataService) {
    
    Object.assign(this, {
      colorSets,
      // weatherData
    });
    this.setColorScheme('cool');
  }

  ngOnInit() {
    
    this.curve = this.forecastDataService.getCurve(this.curveType);
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
      }
    );
  }

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
    this.Charts = this.forecastDataService.BuildCharts(this.ForecastData, "Metric");

  }

}

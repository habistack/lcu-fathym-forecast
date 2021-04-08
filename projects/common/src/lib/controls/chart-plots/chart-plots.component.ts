import { Component, Input, OnInit } from '@angular/core';
import { ForecastDataModel } from '../../models/forecast-data.model';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';
import { DateFormatModel, colorSets, ViewDimensions } from '@lowcodeunit/lcu-charts-common';
import { ForecastPlotsService } from '../../services/forecast-plots.service';


@Component({
  selector: 'lcu-chart-plots',
  templateUrl: './chart-plots.component.html',
  styleUrls: ['./chart-plots.component.scss']
})
export class ChartPlotsComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename

   /**
   * plot height
   */
  @Input('height')
  public Height: number = 300;

  /**
   * plot width
   */
  @Input('width')
  public Width: number = 400;

  /**
   * Should plot fit container
   */
  @Input('fit-container')
  public FitContainer: boolean;

  public animations: boolean = true;
  public autoScale: boolean = false;
  public colorScheme: any;
  public curve: any;
  public gradient: boolean = false;
  public legendPosition: string = 'right';
  public legendTitle: string = '';
  public legendWidth: any = "130px";
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
  public xAxisLabel: string = 'Time';
  public xScaleMax: any;
  public xScaleMin: any;
  public yAxisLabel: string = 'Temperature (F)';
  public backgroundGradientConfigs: any[] = [];
  public showPercentage: boolean = false;
  
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
  public ManualHover: any;

  private colorSets: any;
  private curveType: string = 'Linear';
  private fitContainer: boolean = false;
  
 

  public ChartData: any = [];

  public TempConverted: boolean = false;

  protected forecastPlotDataSubscription: Subscription;

  constructor(protected notificationService: NotificationService,
    protected forecastPlotsService: ForecastPlotsService) {

    Object.assign(this, {
      colorSets,
    });
    this.setColorScheme('cool');
  }

  ngOnInit() {
    // console.log("charts plot called")
    this.curve = this.forecastPlotsService.getCurve(this.curveType);
    if (!this.fitContainer) {
      this.applyDimensions();
    }
    this.forecastPlotDataSubscription = this.notificationService.ForecastPlotDataChanged.subscribe(
      (data: ForecastDataModel) => {
        if (!data) {
          console.error('PlotDataSubscription - No data returned'); return;
        }
        console.log('data from chart-plots: ', data);
        this.ForecastData = data;
        this.convertData();

        // for (const chart of this.Charts) {
        //  chart.chartMousemove.subscribe((e) => {
        //     this.notificationService.OnChartMouseMove(e);
        //   });
        // }
      }
    );
  }

  public hoveredXValue(e){
    // console.log('message from tooltip - the x value hover has changed to: ', e)
    this.ManualHover = e;
    // now send it back to the tooltip to manually show that vertical line

  }

  public hoveredVerticalChange(e) {
    // convert incomming string date to seconds
    // console.log('chart value ', e)

    const seconds = Date.parse(e.value)/1000;
    let point;

    // find point from seconds
    this.ForecastData.points.forEach(p => {
      if(p.absoluteSeconds === seconds){
        point = p;
      }
    });
    // find index from point
    const index = this.ForecastData.points.indexOf(point);

    const chartIndex = {Index: index, Value: point}

    this.notificationService.OnChartMouseMove(chartIndex);

  }


  public onHoverChange(e) {
    this.ManualHover = e;
    // console.log('on hover change...: ', e)
    this.ManualHover = e;
  }

  private applyDimensions(): void {
    this.view = [this.Width, this.Height];
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
  
    this.Charts = this.forecastPlotsService.BuildCharts(this.ForecastData, 'English');
  }

}

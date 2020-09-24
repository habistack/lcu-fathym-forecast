import { Component, OnInit, Input, Output, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { Plot } from '../plots/plots';
import { VariableDataPlotComponent } from '../variable-data-plot/variable-data-plot.component';
import { NotificationService } from '../../services/notification.service';
import { DateFormatModel, colorSets, ViewDimensions } from '@lowcodeunit/lcu-charts-common';
import { ForecastPlotsService } from '../../services/forecast-plots.service';


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
  @Input('forecast-data')
  public ForecastData: Array<any>;

/**
 * valid times
 */
  // tslint:disable-next-line:no-input-rename
  @Input('valid-times')
  public ValidTimes: any;

  /**
   * plot height
   */
  @Input('height')
  public Height: number;

  /**
   * plot width
   */
  @Input('width')
  public Width: number;

  /**
   * Should plot fit container
   */
  @Input('fit-container')
  public FitContainer: boolean;
/**
 * event for mouse movement on charts
 */
  // tslint:disable-next-line:no-output-rename
  @Output('chart-mouse-move')
  public ChartMousemove = new EventEmitter();


  public animations: boolean = true;
  public autoScale: boolean = false;
  public colorScheme: any;
  public curve: any;
  public gradient: boolean = false;
  public legendPosition: string = 'right';
  public legendTitle: string = '';
  public maxXAxisTickLength: number = 16;
  public maxYAxisTickLength: number = 16;
  public ManualHover: any;
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
  public xAxisLabel: string = 'Time';
  public xScaleMax: any;
  public xScaleMin: any;
  public yAxisLabel: string = 'Temperature (F)';
  public precipMeasurmentPerHour: string;
  public precipMeasurment: string;
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
  public Charts: Array<any>;
  public dims: ViewDimensions= {width:300, height: 200, xOffset:80}

  private colorSets: any;
  private curveType: string = 'Linear';
  public ChartData: any = [];


  /**
   * plot component
   */
  // @ViewChildren(VariableDataPlotComponent) varPlots: QueryList<VariableDataPlotComponent>;

constructor(protected notificationService: NotificationService,
            protected forecastPlotsService: ForecastPlotsService) {
              
    Object.assign(this, {
      colorSets,
    });
    this.setColorScheme('cool');
    this.Height = 300;
    this.Width = 400;
  }

ngOnInit(){
  this.curve = this.forecastPlotsService.getCurve(this.curveType);
    if (!this.FitContainer) {
      this.applyDimensions();
    }
    
    this.Charts = this.forecastPlotsService.BuildCharts(this.ForecastData, "Metric");
    this.precipMeasurment = this.forecastPlotsService.getPrecipMeasurement();
    this.precipMeasurmentPerHour = this.forecastPlotsService.getPrecipMeasurementPerHour();
}

 

  /**
   * clear plots
   */
  // public Clear(): void {
  //   this.varPlots.map(x => x.Clear());
  //  }

  /**
   * Set up plots
   */
  public Refresh() {

    // for (const plot of this.Charts) {
    //  plot.chartMousemove.subscribe((e) => {
    //     this.notificationService.OnChartMouseMove(e);
    //   });
    // }
    // this.varPlots.map((x) => {
    //   x.Refresh();
    // });
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

  public onHoverChange(e) {
    this.ManualHover = e;
    // console.log('on hover change...: ', e)
    this.ManualHover = e;
  }

  public hoveredVerticalChange(e) {
    console.log('message from tooltip - the x value hover has changed to: ', e)
    this.ManualHover = e;
    // let index = {index: e.xValue};
    // this.notificationService.OnChartMouseMove(index); TODO Not correct index

    // now send it back to the tooltip to manually show that vertical line
  }
}

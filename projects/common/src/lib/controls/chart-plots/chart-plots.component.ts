import { Component, OnInit } from '@angular/core';
import { ForecastDataModel } from '../../models/forecast-data.model';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';
import { DateFormatModel, colorSets } from '@lowcodeunit/lcu-charts-common';
import * as shape from 'd3-shape';

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
  // public weatherData: any[];
  public xAxisLabel: string = 'Time';
  public xScaleMax: any;
  public xScaleMin: any;
  public yAxisLabel: string = 'Temperature (F)';
  public yScaleMax: number = 100;
  public yScaleMin: number;
  public yUnits: string = '\u00B0';
  public backgroundGradientConfigs: any[] = [];
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

  public ChartData: any = [];

  protected forecastPlotDataSubsription: Subscription;

  constructor(protected notificationService: NotificationService) {
    
    Object.assign(this, {
      colorSets,
      // weatherData
    });
    this.setColorScheme('cool');
    // this.setBackgroundGradientConfigs();
  }

  ngOnInit() {
    this.convertData();
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
    this.setBackgroundGradientConfigs();
    this.forecastPlotDataSubsription = this.notificationService.ForecastPlotDataChanged.subscribe(
      (data: ForecastDataModel) => {
        if (!data) {
          console.error('PlotDataSubscription - No data returned'); return;
        }
        console.log('data from chart-plots: ', data);
      }
    );
  }

  public hoveredVerticalChange(e) {
    // console.log('message from tooltip - the x value hover has changed to: ', e)

    this.ManualHover = e;
    // now send it back to the tooltip to manually show that vertical line
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

  protected setBackgroundGradientConfigs() {
    // console.log("weather data:", this.weatherData)
    // console.log("scheme:", this.schemeType)


    const backgroundMarker = this.ChartData[0].series;

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
    this.ChartData = [
      {
        name: 'Air Temp',
        series: [
          {
            value: 33,
            name: new Date('2020-01-13T12:05:00.000Z'),
          },
          {
            value: 35,
            name: new Date('2020-01-13T12:10:00.000Z')
          },
          {
            value: 34,
            name: new Date('2020-01-13T12:15:00.000Z')
          },
          {
            value: 31,
            name: new Date('2020-01-13T12:20:00.000Z')
          },
          {
            value: 28,
            name: new Date('2020-01-13T12:25:00.000Z')
          },
          {
            value: 30,
            name: new Date('2020-01-13T12:30:00.000Z')
          },
          {
            value: 32,
            name: new Date('2020-01-13T12:35:00.000Z')
          },
          {
            value: 34,
            name: new Date('2020-01-13T12:40:00.000Z')
          },
          {
            value: 37,
            name: new Date('2020-01-13T12:45:00.000Z')
          },
          {
            value: 40,
            name: new Date('2020-01-13T12:50:00.000Z')
          }
        ]
      },
      {
        name: 'Road Surface Temp',
        series: [
          {
            value: 24,
            name: new Date('2020-01-13T12:05:00.000Z')
          },
          {
            value: 25,
            name: new Date('2020-01-13T12:10:00.000Z')
          },
          {
            value: 24,
            name: new Date('2020-01-13T12:15:00.000Z')
          },
          {
            value: 22,
            name: new Date('2020-01-13T12:20:00.000Z')
          },
          {
            value: 20,
            name: new Date('2020-01-13T12:25:00.000Z')
          },
          {
            value: 23,
            name: new Date('2020-01-13T12:30:00.000Z')
          },
          {
            value: 24,
            name: new Date('2020-01-13T12:35:00.000Z')
          },
          {
            value: 27,
            name: new Date('2020-01-13T12:40:00.000Z')
          },
          {
            value: 29,
            name: new Date('2020-01-13T12:45:00.000Z')
          },
          {
            value: 32,
            name: new Date('2020-01-13T12:50:00.000Z')
          }
        ]
      }
    ];
  }

}

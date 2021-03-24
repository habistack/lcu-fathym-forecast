import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { ForecastDataModel } from '../../models/forecast-data.model';
import { ChartMouseMoveModel } from '../../models/chart-mouse-move.model';
import { RoutePointModel } from '../../models/route-point.model';
import { ForecastDetailsComponent } from '../forecast-details/forecast-details.component';
import { MatDialog } from '@angular/material/dialog';
import { ForecastPlotsService } from '../../services/forecast-plots.service';

@Component({
  selector: 'lcu-route-summarization',
  templateUrl: './route-summarization.component.html',
  styleUrls: ['./route-summarization.component.scss']
})
export class RouteSummarizationComponent implements OnInit, OnDestroy {

  public DisplaySummarization: boolean;
  public AllData: ForecastDataModel;
  public ChartPointDetails: ChartMouseMoveModel;
  public RouteName: string;
  public RouteDuration: string;
  public AverageDelayRisk: string;
  public DelayRisk: string;
  public RoadTemp: string;
  public AirTemp: string;
  public Elevation: string;
  public WindSpeed: string;
  public Precipitation: string;
  public TempUnits: string;
  public SpeedUnits: string;

  protected forecastPlotDataSubscription: Subscription;
  protected chartMouseMovedSubsription: Subscription;
  protected forecastRouteChangedSubscription: Subscription;

  constructor(
    protected notificationService: NotificationService,
    protected forecastPlotsService: ForecastPlotsService,
    public dialog: MatDialog) {
    this.DisplaySummarization = false;
  }

  ngOnInit() {
    this.forecastPlotDataSubscription = this.notificationService.ForecastPlotDataChanged.subscribe(
      (data: ForecastDataModel) => {
      
        if (!data) {
          console.error('PlotDataSubscription - No data returned'); return;
        }
        // debugger;
        this.AllData = data;
        this.RouteName = this.AllData.displayName;
        this.calculateRouteDuration();
        this.calculateAverageDelayRisk();
        this.DisplaySummarization = true;
        this.SpeedUnits = this.forecastPlotsService.getSpeedMeasurement();
        this.TempUnits = this.forecastPlotsService.getTempMeasurements();
      }

    );

    this.chartMouseMovedSubsription = this.notificationService.ChartMouseChanged.subscribe(
      (data: ChartMouseMoveModel) => {
        if (!data) {
          console.error('mouse moved - No data returned'); return;
        }
        this.ChartPointDetails = data;
        const forecast = this.AllData.forecast;
        const cpdIdx = this.ChartPointDetails.Index;
        if (this.ChartPointDetails.Index !== -1) {
          // assign point summary properties for when user moves mouse on the graph:
          this.DelayRisk = this.roundToTwoDecimals(forecast.routeDelayRisk[cpdIdx]);
          this.RoadTemp = this.roundToTwoDecimals(forecast.roadTemperature[cpdIdx]) + ' F' ;
          this.AirTemp = this.roundToTwoDecimals(forecast.surfaceTemperature[cpdIdx]) + ' F' ;
          // this.Elevation = forecast.roadTemperature[cpdIdx]; // assign this when elevation comes back
          this.WindSpeed = this.roundToTwoDecimals(forecast.windSpeed[cpdIdx]) + " mph";
          this.Precipitation = this.roundToTwoDecimals(this.convertMMtoIN(forecast.precipitationRateMillisHr[cpdIdx])) + ' in/hr';
        }
      }
    );
  }

  public ngOnDestroy() {
    if (this.forecastPlotDataSubscription) {
      this.forecastPlotDataSubscription.unsubscribe();
      this.chartMouseMovedSubsription.unsubscribe();
      this.forecastRouteChangedSubscription.unsubscribe();
    }
  }

  public OpenDetailsModal() {
    this.dialog.open(ForecastDetailsComponent, {
      width: '80%',
      data: { allData: this.AllData }
    });
  }

  protected calculateRouteDuration(): void {
    const points: Array<RoutePointModel> = this.AllData.points ? this.AllData.points : [];
    const routeDurationSeconds: number =
      points[points.length - 1].absoluteSeconds -
      points[0].absoluteSeconds;

    let minutes: number = routeDurationSeconds / 60;
    const hours: number = Math.floor(minutes / 60);
    minutes = Math.ceil(minutes % 60);

    this.RouteDuration = `${hours} h ${minutes} m`;
  }

  protected calculateAverageDelayRisk(): void {
    // debugger
    this.AverageDelayRisk = this.roundToFourDecimals(
      this.AllData.forecast.routeDelayRisk.reduce((a, b) => a + b, 0) /
      this.AllData.forecast.routeDelayRisk.length
    );
  }

  protected roundToTwoDecimals(n: number): string {
    if (n === 0) {
      return '0';
    }
    if (n) {
      return n.toFixed(2);
    }
  }

  protected roundToFourDecimals(n: number): string {
    if (n === 0) {
      return '0';
    }
    if (n) {
      return n.toFixed(4);
    }
  }

  protected convertMMtoIN(val) {
    return val * 0.03937008;
  }

}

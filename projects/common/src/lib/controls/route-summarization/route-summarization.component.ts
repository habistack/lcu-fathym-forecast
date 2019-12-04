import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { ForecastDataModel } from '../../models/forecast-data.model';
import { ChartMouseMoveModel } from '../../models/chart-mouse-move.model';
import { RoutePointModel } from '../../models/route-point.model';

@Component({
  selector: 'lcu-route-summarization',
  templateUrl: './route-summarization.component.html',
  styleUrls: ['./route-summarization.component.css']
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

  protected forecastPlotDataSubscription: Subscription;
  protected chartMouseMovedSubsription: Subscription;
  protected forecastRouteChangedSubscription: Subscription;

  constructor(protected notificationService: NotificationService) {
    this.DisplaySummarization = false;
  }

  ngOnInit() {
    this.forecastPlotDataSubscription = this.notificationService.ForecastPlotDataChanged.subscribe(
      (data: ForecastDataModel) => {
        if (!data) {
          console.error('PlotDataSubscription - No data returned'); return;
        }
        this.AllData = data;
        this.RouteName = 'Temp Route Name';
        this.calculateRouteDuration();
        this.calculateAverageDelayRisk();
        this.DisplaySummarization = true;
      }

    );

    this.chartMouseMovedSubsription = this.notificationService.ChartMouseChanged.subscribe(
      (data: ChartMouseMoveModel) => {
        if (!data) {
          console.error('mouse moved - No data returned'); return;
        }
        this.ChartPointDetails = data;
        const forecast = this.AllData.forecast;
        // assign point summary properties for when user moves mouse on the graph:
        this.DelayRisk = this.roundToTwoDecimals(forecast.routeDelayRisk[this.ChartPointDetails.Index]);
        this.RoadTemp = this.roundToTwoDecimals(forecast.roadTemperature[this.ChartPointDetails.Index]) + ' F';
        this.AirTemp = this.roundToTwoDecimals(forecast.surfaceTemperature[this.ChartPointDetails.Index]) + ' F';
        // this.Elevation = forecast.roadTemperature[this.ChartPointDetails.Index]; // assign this when elevation comes back
        this.WindSpeed = this.roundToTwoDecimals(forecast.windSpeed[this.ChartPointDetails.Index]) + ' mph';
        this.Precipitation = this.roundToTwoDecimals(forecast.precipitationRate[this.ChartPointDetails.Index]) + ' in/hr';
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
    alert('details modal!')
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
    this.AverageDelayRisk = this.roundToFourDecimals(
      this.AllData.forecast.routeDelayRisk.reduce((a, b) => a + b, 0) /
      this.AllData.forecast.routeDelayRisk.length
    );
  }

  protected roundToTwoDecimals(n: number): string {
    return n.toFixed(2);
  }

  protected roundToFourDecimals(n: number): string {
    return n.toFixed(4);
  }

}

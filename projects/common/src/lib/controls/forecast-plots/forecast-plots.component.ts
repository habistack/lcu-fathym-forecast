import { Component, OnInit, ViewChild } from '@angular/core';
import { ForecastDataPlotComponent } from '../forecast-data-plot/forecast-data-plot.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { NotificationService } from '../../services/notification.service';
import { ForecastDataModel } from '../../models/forecast-data.model'
import { TemperatureConversion } from '../../utils/conversion/temperature.conversion';

@Component({
  selector: 'lcu-forecast-plots',
  templateUrl: './forecast-plots.component.html',
  styleUrls: ['./forecast-plots.component.scss']
})
export class ForecastPlotsComponent implements OnInit {
 // Fields
 @ViewChild(ForecastDataPlotComponent, {static: false}) plot: ForecastDataPlotComponent;

  // Properties
  /**
   * Data for plot forecast
   */
    public PlotForecastData: any;

    /**
     * Different times along route
     */
    public ValidTimes: Array<number>;

    protected geofenceDrawingClearedeSubscription: Subscription;
    protected forecastPlotDataSubsription: Subscription;

  constructor(protected notificationService: NotificationService) {
    this.ValidTimes = [];
  }

 // Life Cycle
 public ngOnInit() {

  this.forecastPlotDataSubsription = this.notificationService.ForecastPlotDataChanged.subscribe(
    (data: any) => {
      if (!data) {
        console.error('PlotDataSubscription - No data returned'); return;
      }
      this.dataResponse(this.convertForecastData(data));
      }
    );

  //  this.geofenceDrawingClearedeSubscription = this.notificationService.ForecastDetailsCleared.subscribe(
  //    () => {
  //     this.clearPlots();
  //    }
  //  );
 }

 /**
  * unsubscribe subsriptions
  */
 public ngOnDestroy() {

  if (this.forecastPlotDataSubsription) { this.forecastPlotDataSubsription.unsubscribe(); }
 // if (this.geofenceDrawingClearedeSubscription) { this.geofenceDrawingClearedeSubscription.unsubscribe(); }
}

 // API Methods

 /**
	 * Handle the response from a geofence shape search
	 *
	 * @param response returned data
	 */
  protected dataResponse(response: ForecastDataModel): void {

    this.PlotForecastData = response;

    const routePoints: Array<any> = [];

    Object.entries(response.RoutePoints).forEach(itm => {
      const item: any = itm[1];

      routePoints.push(
        {
          lng: item.lng,
          lat: item.lat
        });

      this.ValidTimes.push(item['absolute-seconds']);
    });

    Object.entries(response.ForecastConditions).forEach(itm => {
      const item: any = itm[1];

      if (item.name.toUpperCase() === 'TEMPERATURE' && item.level.toUpperCase() === 'SURFACE') {
        this.PlotForecastData.sfc_t = [];
        for (const temp of item.values) {
          this.PlotForecastData.sfc_t.push(TemperatureConversion.KelvinToFahrenheit(temp));
        }
      }
    });

    this.plot.Refresh();
  }

 // Helpers

 /**
  * Clear plots
  */
 protected clearPlots(): void {
  this.plot.Clear();
 }

 /**
  * Convert forecast data
  *
  * @param data response data
  */
 protected convertForecastData(data: any): ForecastDataModel {

  const forecastData: ForecastDataModel = new ForecastDataModel();
  forecastData.ForecastConditions = data.forecast;
  forecastData.RoutePoints = data.points;

  return forecastData;
 }
}

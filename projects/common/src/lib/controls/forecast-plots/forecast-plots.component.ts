import { Component, OnInit, ViewChild } from '@angular/core';
import { ForecastDataPlotComponent } from '../forecast-data-plot/forecast-data-plot.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { NotificationService } from '../../services/notification.service';

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
      this.dataResponse(data);
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
  protected dataResponse(response: any): void {

    let data: object = {};

    // data being returned from geofence search and route search has a different structure
    // this should not be this way, but doing this for now - shannon
    // if (response['data'][0]['data']) {
    //   data = response['data'][0]['data'];
    // } else {
    //   data = response['data'][0];
    // }

    // const data = response['data'][0]['data'];

    this.PlotForecastData = response;

    const plotArr: Array<any> = [];
    Object.entries(response).forEach(itm => {
      plotArr.push(itm[1]['values']);
      this.ValidTimes.push(itm[1]['absolute-seconds']);
    });

    const surfaceTempArr: Array<any> = [];

    for (const itm of plotArr) {
      if (itm[0].var.level.toUpperCase() === 'SURFACE' && itm[0].var.name.toUpperCase() === 'TEMPERATURE') {
        surfaceTempArr.push(itm[0].value);
      }
    }

    this.PlotForecastData.sfc_t = surfaceTempArr;

    // this.ValidTimes = this.PlotForecastData['vtimes']; // for testing - shannon
    // this.ValidTimes = response['valid_times'] || data['vtimes'] || response['data'][0]['valid_times']; // more hacking
    this.plot.Refresh();
  }

 // Helpers

 /**
  * Clear plots
  */
 protected clearPlots(): void {
  this.plot.Clear();
 }
}

import { Component, Injector, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { IControlRender } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeWcForecastPlotsDetails, ForgeWcForecastPlotsConfig } from '../wc-forecast-plots.core';

// import { NotificationService, ForecastDataPlotComponent } from '@weather-cloud/common';
import { Subscription } from 'rxjs/internal/Subscription';
import { ForecastDataPlotComponent } from '../../controls/forecast-data-plot/forecastDataPlot.component';
import { NotificationService } from '@weather-cloud/common';

@Component({
  selector: 'forge-wc-forecast-plots-render',
  templateUrl: './wc-forecast-plots-render.component.html',
  styleUrls: ['./wc-forecast-plots-render.component.scss']
})

export class ForgeWcForecastPlotsRenderComponent
  extends ForgeGenericControl<ForgeWcForecastPlotsDetails, ForgeWcForecastPlotsConfig>
  implements OnInit, OnDestroy, IControlRender<ForgeWcForecastPlotsDetails, ForgeWcForecastPlotsConfig> {

  // Fields
 @ViewChild(ForecastDataPlotComponent) plot: ForecastDataPlotComponent;

  // Properties
  /**
   * Data for plot forecast
   */
    public PlotForecastData: any;

    /**
     * Different times along route
     */
    public ValidTimes: any;

    protected geofenceDrawingClearedeSubscription: Subscription;
    protected forecastPlotDataSubsription: Subscription;

  constructor(protected injector: Injector, private notificationService: NotificationService) {
    super(injector);
  }

 // Life Cycle
 public ngOnInit() {

  this.forecastPlotDataSubsription = this.notificationService.ForecastPlotDataChanged.subscribe(
    (data: any) => {

      if (!data['data'] || Object.keys(data['data'][0]).length < 1) { console.error('PlotDataSubscription - No data returned'); return; }
        this.dataResponse(data);
     }
    );

   this.geofenceDrawingClearedeSubscription = this.notificationService.ForecastDetailsCleared.subscribe(
     () => {
      this.clearPlots();
     }
   );
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
    if (response['data'][0]['data']) {
      data = response['data'][0]['data'];
    } else {
      data = response['data'][0];
    }

    // const data = response['data'][0]['data'];
    this.PlotForecastData = data;
    this.ValidTimes = response['valid_times'] || data['vtimes'] || response['data'][0]['valid_times']; // more hacking
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

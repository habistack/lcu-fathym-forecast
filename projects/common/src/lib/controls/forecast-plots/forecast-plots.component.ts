import { Component, OnInit, ViewChild } from '@angular/core';
import { ForecastDataPlotComponent } from '../forecast-data-plot/forecast-data-plot.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { NotificationService } from '../../services/notification.service';
import { ForecastDataModel } from '../../models/forecast-data.model'
import { TemperatureConversion } from '@lcu/common';

@Component({
  selector: 'lcu-forecast-plots',
  templateUrl: './forecast-plots.component.html',
  styleUrls: ['./forecast-plots.component.scss']
})
export class ForecastPlotsComponent implements OnInit {
  // Fields
  @ViewChild(ForecastDataPlotComponent, { static: false }) plot: ForecastDataPlotComponent;

  // Properties
  /**
   * Data for plot forecast
   */
  public PlotForecastData: ForecastDataModel;

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
    this.clearPlots();
    this.forecastPlotDataSubsription = this.notificationService.ForecastPlotDataChanged.subscribe(
      (data: ForecastDataModel) => {
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
  protected dataResponse(response: ForecastDataModel): void {

    this.PlotForecastData = response;
    /** This is here for now, can be moved to a location where we change the temperature type at runtime - Shannon */
    Object.entries(this.PlotForecastData.forecast).forEach(itm => {
      // console.log("item: ", itm);
      if (itm[0] === 'surfaceTemperature' || itm[0] === 'roadTemperature') {
        for (let i = 0; i < itm[1].length; i++) {
          itm[1][i] = TemperatureConversion.KelvinToFahrenheit(itm[1][i]);
        }
      }
      if (itm[0] === 'roadState') { 
      for (let i = 0; i < itm[1].length; i++) {
        switch (itm[1][i]) {
          case 'Dry':
            itm[1][i] = 0;
            break;
          case 'Wet':
            itm[1][i] = 1;
            break;
          case 'Freezing Rain':
            itm[1][i] = 2;
            break;
          case 'Snow':
            itm[1][i] = 3;
            break;
          case 'Snow and Ice':
            itm[1][i] = 4;
            break;
          case 'Freezing Rain and Ice':
            itm[1][i] = 5;
            break;
          case 'Ice':
            itm[1][i] = 6;
            break;
          case 'Hail and Ice':
            itm[1][i] = 7;
            break;
          case 'Hail':
            itm[1][i] = 8;
            break;
          default:
            console.log("data doesnt exist");
            break;
        }
      }
    }
    });

    for (const itm of this.PlotForecastData.points) {
      this.ValidTimes.push(itm.absoluteSeconds);
    }

    this.plot.Refresh();
  }

  // Helpers

  /**
   * Clear plots
   */
  protected clearPlots(): void {
    if(this.plot){
    this.plot.Clear();
    }
  }
}

import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { WeatherCloudSearchModel } from '../models/wc-search.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public DepartureTableChanged = new Subject<WeatherCloudSearchModel>();
  public ForecastPlotDataChanged = new Subject<any>();
  public DelayRiskDataChanged = new Subject<any>();
  public GeofenceDrawingStarted = new Subject<WeatherCloudSearchModel>();
  public ForecastDetailsCleared = new Subject();
  public RouteChanged = new Subject<WeatherCloudSearchModel>();
  // public GeofenceShapeCompleted = new Subject<any>();

  constructor() { }

  public UpdateDepartureTable(params: WeatherCloudSearchModel, searching: boolean): void {
    const data: WeatherCloudSearchModel = { ...params };
    data.IsSearching = searching;

    this.DepartureTableChanged.next(data);
  }

  public SearchRoute(params: WeatherCloudSearchModel, searching: boolean): void {
    const data: WeatherCloudSearchModel = { ...params };
    data.IsSearching = searching;

    this.RouteChanged.next(data);
  }

  public StartGeofenceDrawing(params: WeatherCloudSearchModel, drawing: boolean): void {
    const data: WeatherCloudSearchModel = { ...params };
    data.IsSearching = drawing;

    this.GeofenceDrawingStarted.next(data);
  }

  public ClearForecastDetails(): void {
    this.ForecastDetailsCleared.next();
  }

  public UpdateForecastPlotData(params: any): void {
    this.ForecastPlotDataChanged.next({ ...params });
    this.DelayRiskDataChanged.next({ ...params });
  }


  // public CompleteGeofenceDrawing(params: any): void {
  //   this.GeofenceShapeCompleted.next({ ...params });
  // }
}

import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SearchModel } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public DepartureTableChanged = new Subject<SearchModel>();
  public ForecastPlotDataChanged = new Subject<any>();
  public DelayRiskDataChanged = new Subject<any>();
  public GeofenceDrawingStarted = new Subject<SearchModel>();
  public ForecastDetailsCleared = new Subject();
  public RouteChanged = new Subject<SearchModel>();
  public ChartMouseChanged = new Subject<any>();
  // public GeofenceShapeCompleted = new Subject<any>();

  constructor() { }

  public UpdateDepartureTable(params: SearchModel, searching: boolean): void {
    const data: SearchModel = { ...params };
    data.IsSearching = searching;

    this.DepartureTableChanged.next(data);
  }

  public SearchRoute(params: SearchModel, searching: boolean): void {
    const data: SearchModel = { ...params };
    data.IsSearching = searching;
    console.log("data for search routes: ", data)
    this.RouteChanged.next(data);
  }

  public StartGeofenceDrawing(params: SearchModel, drawing: boolean): void {
    const data: SearchModel = { ...params };
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

  public OnChartMouseMove(params: any): void {
    this.ChartMouseChanged.next({ ...params });
  }

  // public CompleteGeofenceDrawing(params: any): void {
  //   this.GeofenceShapeCompleted.next({ ...params });
  // }
}

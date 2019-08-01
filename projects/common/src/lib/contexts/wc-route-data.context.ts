import { Injectable } from '@angular/core';
import { ObservableContextService } from '@lcu/api';
import { WeatherCloudRouteDataModel } from '../models/wc-route-data.model';

@Injectable({
  providedIn: 'root'
  })
  export class WeatherCloudRouteDataContext extends ObservableContextService<WeatherCloudRouteDataModel> {
  // Fields

  // Properties

  // Constructors
  constructor() {
    super();
  }

  // API Methods
  public Search(model: WeatherCloudRouteDataModel): void {
    this.subject.next(model);
  }


  // Helpers
  protected defaultValue(): WeatherCloudRouteDataModel {
    return <WeatherCloudRouteDataModel>{};
  }
}

import { Injectable } from '@angular/core';
import { ObservableContextService } from '@lcu/api';
import { WeatherCloudSearchModel } from '../models/wc-search.model';

@Injectable({
  providedIn: 'root'
  })
  export class WeatherCloudSearchDepartureTableContext extends ObservableContextService<WeatherCloudSearchModel> {
  // Fields

  // Properties

  // Constructors
  constructor() {
    super();
  }

  // API Methods
  public Search(model: WeatherCloudSearchModel): void {
   this.subject.next({...model});
  }


  // Helpers
  protected defaultValue(): WeatherCloudSearchModel {
    return <WeatherCloudSearchModel>{};
  }
}

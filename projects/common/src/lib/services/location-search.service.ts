import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { SearchModel } from '../models/search.model';

import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { WeatherCloudConfig } from '../models/weather.config';
import { RouteModel } from '../models/route.model';
import { RouteResultsModel } from '../models/route-results.model';


@Injectable({
  providedIn: 'root'
})
export class LocationSearchService {

  public WeatherCloudConfig: WeatherCloudConfig;

  constructor(protected http: HttpClient) { }

  public Search(term: string, lbsKey: string): Observable<RouteModel> {

    if (!term) {
      return of(new RouteModel());
    }

    let headers = new HttpHeaders();
        headers = headers.set('Ocp-Apim-Subscription-Key', lbsKey);

    const url = 'https://atlas.microsoft.com/search/address/json';

    const params = {
      'api-version': '1',
      'typeahead': 'true',
      'query': term,
      'Subscription-Key': lbsKey
    }

    return this.http.get<any>(url, { params: params, headers: headers })
    .pipe(
      tap((res: RouteModel) => {
        return res.results;
      })
    );
  }
}

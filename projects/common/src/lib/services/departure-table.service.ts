import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { WeatherCloudModel } from '../models/wc.model';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class WeatherCloudService {
    //  Fields
    protected apiRoot: string = 'https://wxlb01.fathym.com';
    // tslint:disable-next-line:max-line-length
    protected forecastWrapper: string = 'https://flw-rd.azurewebsites.net/api/ForecastWrapperAPIFunction?code=eLPC6WXunKwh8fKMaT/phsUAbbdSQ72kqbFSCp34BOeZmBOJQ5CWww==';


    constructor(protected http: HttpClient) {

  }


    /**
   * Return data for the departure table
   *
   * @param apiKey token key
   * @param origin starting location
   * @param destination ending location
   * @param departTime departure time
   * @param includeAlts include alternative routes
   */

    public GetDepartureTableData(
        apiKey: string,
        origin: string,
        destination: string,
        departTime: string,
        includeAlts: boolean): Observable<any[]> {
   
       if (!apiKey) {
         console.warn('An API Key is needed for the departure table');
         return;
       }
   
       if (!origin) {
         console.warn('An origin must be set');
         return;
       }
   
       if (!destination) {
         console.warn('A destination must be set');
         return;
       }
   
       let httpParams = new HttpParams();
       httpParams = httpParams.append('origin', origin);
       httpParams = httpParams.append('destination', destination);
       httpParams = httpParams.append('includeAlts', String(includeAlts));
       httpParams = httpParams.append('departTime', departTime);
       httpParams = httpParams.append('token', apiKey);

       return this.http.get<any[]>(`${this.forecastWrapper}`, { params: httpParams }).pipe(
        map(res => {
          return res;
        })
      );
    }
  }
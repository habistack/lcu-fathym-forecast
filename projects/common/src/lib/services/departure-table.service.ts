import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { WeatherModel } from '../models/weather.model';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class DataServiceTrevors {
    //  Fields
    protected apiRoot: string = 'https://wxlb01.fathym.com';
    // tslint:disable-next-line:max-line-length
    protected forecastWrapper: string = 'https://flw-rd.azurewebsites.net/api/ForecastWrapperAPIFunction?code=eLPC6WXunKwh8fKMaT/phsUAbbdSQ72kqbFSCp34BOeZmBOJQ5CWww==';
    protected techAccentAPI: string = 'https://fathym-forecast-int.azure-api.net/api/v0/api-variables';
    protected subscriptionKey: string = 'dedc205ffda64e5c91f922a9b0ddacb5';
    protected azureMapsKey: string = '';
    protected forecastAPIKey: string = '';

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

       let headers: HttpHeaders = new HttpHeaders();
       headers = headers.set('Ocp-Apim-Subscription-Key', this.subscriptionKey);
   
       let httpParams = new HttpParams();
       httpParams = httpParams.append('origin', origin);
       httpParams = httpParams.append('destination', destination);
       httpParams = httpParams.append('includeAlts', String(includeAlts));
       httpParams = httpParams.append('departTime', departTime);
       // httpParams = httpParams.append('token', apiKey);
       httpParams = httpParams.append('Subscription-Key', this.subscriptionKey);
      //  debugger;
       return this.http.get<any[]>(`${this.techAccentAPI}`, { params: httpParams, headers: headers }).pipe(
        map(res => {
          return res;
        })
      );
    }
  }
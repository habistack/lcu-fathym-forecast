import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders,
  HttpUrlEncodingCodec,
} from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { WeatherModel } from '../models/weather.model';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { FathymForecastConfig } from '../models/weather.config';
import { SearchConstants } from '../constants/search.constants';
import { SearchModel } from '../models/search.model';
import { HttpUrlEncoder } from '../utils/http/http-url-encoder.utils';
// import { FathymForecastConfigContext } from '../contexts/ff-config.context';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  //  Fields
  protected apiRoot = 'https://wxlb01.fathym.com';
  protected subscriptionKey = 'dedc205ffda64e5c91f922a9b0ddacb5';
  protected azureMapsKey =
    'MSrrKthFlRDpZE_OEEAn2Mlya4Qw7Fy_2zxU3G8YF10';
  protected forecastAPIKey = 'dedc205ffda64e5c91f922a9b0ddacb5';

  // tslint:disable-next-line:max-line-length
  protected forecastWrapper =
    'https://flw-rd.azurewebsites.net/api/ForecastWrapperAPIFunction?code=eLPC6WXunKwh8fKMaT/phsUAbbdSQ72kqbFSCp34BOeZmBOJQ5CWww==';

  // protected oldCallForRoutes: string
  // https://wxlb01.fathym.com/route?
  // origin=32.7499,-97.33034&
  // destination=40.58897,-105.08246&
  // includeAlts=true&token=fathym&
  // var_names=t,sfc_t,prate,ptype,wspd,gust,cloudcover,rad,vis,rt,primary_roadstate

  protected ffConfig: FathymForecastConfig;

  //  Properties

  //  Constructors
  // constructor(protected http: HttpClient, protected ffConfigCtxt: FathymForecastConfigContext) {
  constructor(protected http: HttpClient) {
    // this.ffConfigCtxt.Context.subscribe(res => {
    //   this.ffConfig = res;
    // });
  }

  //  API Methods
  public Blend() {
    if (this.ffConfig && this.ffConfig.ServerURL) {
      console.log('public Blend - need to uncomment this - shannon');
      // const url = this.ffConfig.ServerURL + '/blend/times';
      const url = this.ffConfig.ServerURL;

      return this.http.get(url).pipe(
        map((response: any) => {
          return {
            ImageVarNames: response.var_names,
            ImageValidTimes: response.valid_times,
          };
        })
      );
    }
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
    includeAlts: boolean
  ): Observable<any[]> {
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
    // httpParams = httpParams.append('token', apiKey);

    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append(
      'Access-Control-Allow-Methods',
      'PUT, GET, POST, DELETE, OPTIONS'
    );
    headers = headers.append('Access-Control-Allow-Headers', 'Content-Type');

    // return this.http.get<any[]>(`${this.apiRoot}/departtimes`, { params: httpParams }).pipe(
    //   map(res => {
    //     const data = this.remapData(res);
    //     return data;
    //   })
    // );
    // debugger;
    return this.http
      .get<any[]>(`${this.forecastWrapper}`, {
        headers,
        params: httpParams,
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public RouteData(search: SearchModel): Observable<object> {
    const url =
      'https://azure-maps-router-int.azurewebsites.net/api/routeforecast';

    let httpParams = new HttpParams();
    httpParams = httpParams.append('origin', search.Origin);
    httpParams = httpParams.append('destination', search.Destination);
    httpParams = httpParams.append('departAt', search.DepartureTime);
    httpParams = httpParams.append('includeAlts', search.IncludeAlts);

    httpParams = httpParams.append('azureMapsKey', this.azureMapsKey);
    httpParams = httpParams.append('forecastAPIKey', this.forecastAPIKey);
    httpParams = httpParams.append('code', 'ShannonB');

    return this.http.get(url, { params: httpParams });
  }
  /**
   * Data returned from route search
   *
   * @param search object containing search information
   */
  public HandleRoute(search: SearchModel): Observable<object> {
    // const url = search.SearchDatasourceType.Host + search.SearchDatasourceType.URLPrefix + '/routefcst';
    // const url = search.SearchDatasourceType.Host;

    // let httpParams = new HttpParams();
    // httpParams = httpParams.append('origin', search.Origin);
    // httpParams = httpParams.append('destination', search.Destination);
    // httpParams = httpParams.append('departTime', search.DepartureTime);
    // httpParams = httpParams.append('includeAlts', String(search.IncludeAlts || false));
    // httpParams = httpParams.append('token', 'fathym');

    let httpParams = new HttpParams();
    httpParams = httpParams.append('origin', '32.7499, -97.33034');
    httpParams = httpParams.append('destination', '40.58897,-105.08246');
    httpParams = httpParams.append('departTime', '1567621321');
    httpParams = httpParams.append('includeAlts', 'false');
    httpParams = httpParams.append('token', 'fathym');

    // origin=32.7499,-97.33034&
    // destination=40.58897,-105.08246&
    // includeAlts=true&token=fathym&
    // var_names=t,sfc_t,prate,ptype,wspd,gust,cloudcover,rad,vis,rt,primary_roadstate

    // if (search.SearchDatasourceType.FcstCfg) {
    //   httpParams = httpParams.append('fcst_cfg', search.SearchDatasourceType.FcstCfg);
    // }

    // if (search.SearchDatasourceType.VarNames) {
    //   httpParams = httpParams.append('var_names', search.SearchDatasourceType.VarNames);
    // }
    const url = 'https://wxlb01.fathym.com/route';

    return this.http.get(url, { params: httpParams });
  }

  public SearchAzureMapsPOI(text: string, lbsKey: string) {
    text = text.trim();

    if (text === '') {
      return of([]);
    }

    let headers = new HttpHeaders();

    headers = headers.set('Ocp-Apim-Subscription-Key', lbsKey);

    const url =
      'https://atlas.microsoft.com/search/address/json?api-version=1&typeahead=true&query=' +
      text;

    return this.http.get(url, { headers }).pipe(
      map((response: any) => {
        return response.results as any[];
      })
    );
  }

  public LoadDataSources() {
    // should fetch these from server in the future

    return [
      {
        Name: SearchConstants.FORECAST_MODEL_HRRR,
        URLPrefix: '/fcst',
        FcstCfg: 'hrrr_config',
        Host: 'http://fathymwx.westus.cloudapp.azure.com',
        VarNames: '',
        // VarNames: 't,sfc_t,prate,ptype,wspd,gust,cloudcover,rad,vis,rt,primary_roadstate,elev'
        // Host: (this.ffConfig ? this.ffConfig.ServerURL : ''),
        // VarNames: (this.ffConfig ? this.ffConfig.VariableNames : ''),
      },
      {
        Name: SearchConstants.FORECAST_MODEL_GFS,
        URLPrefix: '/fcst',
        FcstCfg: 'gfs_config',
        Host: 'http://fathymwx.westus.cloudapp.azure.com',
        VarNames: '',
        // VarNames: 't,sfc_t,prate,ptype,wspd,gust,cloudcover,rad,vis,rt,primary_roadstate,elev'
        // Host: (this.ffConfig ? this.ffConfig.ServerURL : ''),
        // VarNames: (this.ffConfig ? this.ffConfig.VariableNames : ''),
      },
      {
        Name: SearchConstants.FORECAST_MODEL_BLEND,
        URLPrefix: '/blend',
        FcstCfg: null,
        Host: 'http://fathymwx.westus.cloudapp.azure.com',
        VarNames: '',
        // VarNames: 't,sfc_t,prate,ptype,wspd,gust,cloudcover,rad,vis,rt,primary_roadstate,elev'
        // Host: (this.ffConfig ? this.ffConfig.ServerURL : ''),
        // VarNames: (this.ffConfig ? this.ffConfig.VariableNames : ''),
      },
      {
        Name: SearchConstants.FORECAST_MODEL_MWAVE,
        URLPrefix: '/fcst',
        FcstCfg: 'mwave_config',
        Host: 'http://localhost',
        VarNames: null,
      },
    ];
  }

  //  Helpers

  /**
   * API call when creating geofence shape regions on the map
   *
   * @param points array of lat/long values that represent each point of the shape
   */
  public ShapeRegion(
    points: Array<Array<number>>,
    searchData: SearchModel
  ): any {
    const url =
      'http://fathymwx.westus.cloudapp.azure.com/fcst/fcstpoly';
    // const url: string = 'http://fathymwx.westus.cloudapp.azure.com/blend/routefcst';
    let pointArr: Array<string> = [];
    let pointStr = '';

    pointArr = points.map((item: Array<number>) => {
      // lat / long values come in backwards, so they need to be reveresed
      return '[' + item.reverse() + ']';
    });

    pointStr = pointArr.toString();

    let httpParams = new HttpParams({
      encoder: new HttpUrlEncoder(),
    });

    httpParams = httpParams.append('latlons', '[' + pointStr + ']');
    httpParams = httpParams.append('method', 'avg');
    httpParams = httpParams.append('departTime', searchData.DepartureTime);

    if (searchData.SearchDatasourceType.VarNames) {
      httpParams = httpParams.append(
        'var_names',
        searchData.SearchDatasourceType.VarNames
      );
    }

    return this.http
      .get<any>(url, { params: httpParams })
      .pipe(
        map((res) => {
          console.log(res);
          return res;
        })
      );
  }

  /**
   * Remap the data being returned so it fits with format we expect
   *
   * @param val Date being returned from API
   */
  private remapData(val: any): Array<WeatherModel> {
    const arr: Array<WeatherModel> = [];
    const element = val.data[0];
    Object.keys(element).forEach((key, index) => {
      const item = {} as WeatherModel;
      Object.keys(element[key]).forEach((childKey, childIndex) => {
        switch (childKey.toUpperCase()) {
          case 'GUST':
            item.WindGustMin = element[key][childKey][0];
            item.WindGustMax = element[key][childKey][1];
            break;
          case 'PRECIP':
            item.PrecipMin = element[key][childKey][0];
            item.PrecipMax = element[key][childKey][1];
            break;
          case 'PTYPE':
            item.PtypeMin = element[key][childKey][0];
            item.PtypeMax = element[key][childKey][1];
            break;
          case 'SPD':
            item.WindSpdMin = element[key][childKey][0];
            item.WindSpdMax = element[key][childKey][1];
            break;
          case 'TEMP':
            item.TempMin = element[key][childKey][0];
            item.TempMax = element[key][childKey][1];
            break;
          case 'VTIMES':
            item.VtimesStart = element[key][childKey][0];
            item.VtimesEnd = element[key][childKey][1];
            break;
        }
      });
      arr.push(item);
    });
    return arr;
  }
}

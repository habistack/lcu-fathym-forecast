<<<<<<< HEAD
import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
=======
import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy, ElementRef } from '@angular/core';
>>>>>>> integration
import { MatSlider } from '@angular/material/slider';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { of } from 'rxjs/internal/observable/of';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToastrDisplayService } from '../../services/toastr-display.service';
import { NotificationService } from '../../services/notification.service';
import { ImageDateFormatPipe, DisplayDateFormatPipe } from '../../utils/pipes/ff-pipes';
import { DataService } from '../../services/data.service';
import { FathymForecastConfig } from '../../models/weather.config';
import { SearchModel } from './../../models/search.model';
import { GeofenceDrawingTool } from '../../utils/map/geofence-drawing-tool.utils';
import { LoadMapService, AtlasMapComponent } from '@acaisoft/angular-azure-maps';
import { ChartMouseMoveModel } from '../../models/chart-mouse-move.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouteInfoModel } from '../../models/route-info.model';


@Component({
  selector: 'lcu-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.scss']
})
export class RouteMapComponent implements OnInit, OnDestroy, AfterViewInit {

  //  Fields
  protected dataSource: any;

  protected dataSources: any;

  protected currentForecastLayer: any;

  //  Properties

  /**
   * Map component
   */
  public Maper: AtlasMapComponent;
  @ViewChild('map', {read: ElementRef, static: true })
  public set map(val: AtlasMapComponent) {
    if (val && (this.Config && this.MapService.isLoaded)) {
      this.Maper = val;
    }
  }

  /**
   * Plot component
   */
  // @ViewChild(ForecastDataPlotComponent)
  // public Plot: ForecastDataPlotComponent;

  /**
   * Image slider component
   */
  @ViewChild('imageSlider', { static: false })
  public Slider: MatSlider;

  /**
   * Check if things are loaded
   */
  // tslint:disable-next-line:variable-name
  private _isLoading = false;
  public set IsLoading(val: boolean) {
    this._isLoading = val;
  }

  public get IsLoading(): boolean {
    return this._isLoading;
  }
  /**
   * The list of routes a user can select from
   */
  public Routes: Array<RouteInfoModel>;
  /**
   * the default route selected
   */
  public DefaultRoute: RouteInfoModel;

  /**
   * Position plot points for route(s)
   */
  public Route: Array<atlas.data.Position> = null;

  /**
   * Map configuration
   */
  public Config: any = {};

  /**
   * Route current marker
   */
  public currentMarker: atlas.data.Feature = null;

  /**
   * Route end marker
   */
  public endMarker: atlas.data.Feature = null;

  /**
   * Forecast data
   */
  public FcstData: any;

  /**
   * Valid Times
   */
  public ValidTimes: any;

  // public imageLayer: atlas.layer.Layer = null;

  public ImageValidTimes: any[];

  public ImageVarNames: any[];

  /**
   * Loading class
   */
  // public Loading: Loading;

  protected minLat: number;

  protected minLong: number;

  protected maxLat: number;

  protected maxLong: number;

  /**
   * Class for search
   */
  public SearchModel: SearchModel;

  public selectedValidTime = '';

  public SelectedVarName = null;

  /**
   * Route starting marker
   */
  public startMarker: atlas.data.Feature = null;

  /**
   * Store route names
   */
  protected routeNames: Array<string>;

  /**
   * Listen for route change
   */
  protected routeSubscription: Subscription;

  /**
   * Listen for drawRegionToggle change
   */
  protected drawRegionToggleSubscription: Subscription;

  protected chartMouseMovedSubsription: Subscription;

  /**
   * Configuration object for fathym forecast
   */
  public FathymForecastConfig: FathymForecastConfig;

  /**
   * Class for drawing region shapes on the map
   */
  protected geofenceDrawingTool: GeofenceDrawingTool;

  // public layerOptions: Array<any> = ['Radar precipitation', 'Radar reflectivity'];
  public layerOptions: Array<any> = [];
  // protected toggleTerrainOptions: Array<string> = ['Toggle terrain', 'Toggle map labels']
  protected techAccentAPI: string = 'https://fathym-forecast-int.azure-api.net/api/v0/maptile-manifest';
  protected subscriptionKey: string = 'dedc205ffda64e5c91f922a9b0ddacb5';
  protected manifestJson;

  public ShowIndicatorIcon: boolean;

  protected apiForecastValueConversions: any = [];

  protected currentTimeValue: number;
  protected currentTimeIndex: number;
  public OutOfBoundsMessage: string;
  public ShowLayerTimeOutOfBoundsMessage: boolean;

  //  Constructors
  constructor(
    public MapService: LoadMapService,
    protected dataService: DataService,
    protected displayDatePipe: DisplayDateFormatPipe,
    protected imageDatePipe: ImageDateFormatPipe,
    protected notificationService: NotificationService,
    protected toastrDisplayService: ToastrDisplayService,
    protected http: HttpClient
  ) {

    this.ShowLayerTimeOutOfBoundsMessage = false;

    this.dataSources = {};

    this.ImageValidTimes = [];

    this.ImageVarNames = [];

    this.minLat = 9999;

    this.minLong = 9999;

    this.maxLat = -9999;

    this.maxLong = -9999;


    // this.Loading = new Loading();

    this.setUpLayers();

  }

  //  Life Cycle
  public ngAfterViewInit(): void {
    
  }

  public ngOnInit(): void {
    this.getGoing();
  }

  
  protected getGoing(): void {
    this.Routes = new Array<RouteInfoModel>();

    setTimeout(() => {
      this.initialSetup();
    }, 500);

    this.chartMouseMovedSubsription = this.notificationService.ChartMouseChanged.subscribe(
      (data: ChartMouseMoveModel) => {
        if (!data) {
          console.error('mouse moved - No data returned'); return;
        }

        // console.log('data', data);
        // setInterval(() => {
        this.setCurrentMarker(data.Index);

        // }, 50)

        this.setTimeFromChart(data.Value);


        if (this.currentForecastLayer) {
          let closestTimeIndex = 0;
          const timeInterval = this.manifestJson[this.currentForecastLayer.value][1] - this.manifestJson[this.currentForecastLayer.value][0];
          // find the closest index in the manifest times to the current time in the data and send in that index
          // closestTimeIndex = this.manifestJson[this.currentForecastLayer.value].findIndex(val => val > data.Value);
          closestTimeIndex = this.manifestJson[this.currentForecastLayer.value].findIndex(val => Math.abs(val - data.Value) < (timeInterval / 2));
          if ((this.currentTimeIndex !== closestTimeIndex) && (closestTimeIndex >= 0)) {
            this.getLayerFromFathymAPI(this.currentForecastLayer, closestTimeIndex);
          }
          if ((closestTimeIndex < 0) && (this.currentTimeIndex !== closestTimeIndex)) {
            let utcSeconds = this.manifestJson[this.currentForecastLayer.value][this.manifestJson[this.currentForecastLayer.value].length - 1];
            const lastDateTime = new Date(0);
            lastDateTime.setUTCSeconds(utcSeconds);
            this.getLayerFromFathymAPI(this.currentForecastLayer, this.manifestJson[this.currentForecastLayer.value].length - 1)
          }
          if (closestTimeIndex < 0) {
            let utcSeconds = this.manifestJson[this.currentForecastLayer.value][this.manifestJson[this.currentForecastLayer.value].length - 1];
            
            // determine time difference: current mouse point - last known mousepoint on manifest
            const secDiff = data.Value - utcSeconds;

            const hourDiff = Math.floor(secDiff / 60 / 60);
            const minDiff = Math.floor(secDiff / 60 - (hourDiff * 60));

            const timeDifferenceString = `${hourDiff} hr ${minDiff} min`;

            this.OutOfBoundsMessage = `No maptiles available for that precise time. Nearest available forecast time: ${timeDifferenceString} earlier.`;

          }
          this.currentTimeIndex = closestTimeIndex;
          this.ShowLayerTimeOutOfBoundsMessage = closestTimeIndex < 0 && this.currentForecastLayer;
        }

      }
    );

  }

  public ngOnDestroy(): void {
    this.chartMouseMovedSubsription.unsubscribe();
  }

  protected setUpDefaultLayer() {
    const mapperPromise = new Promise((resolve, reject) => {
      let intervalCount;
      const mapperInterval = setInterval(() => {
        if (this.Maper) {
          resolve();
          clearInterval(mapperInterval);
        }
        intervalCount++;
        if (intervalCount > 10) {
          clearInterval(mapperInterval);
        }
      }, 1000);
    });

    mapperPromise.then(() => {
      this.LayerChosen(this.layerOptions[0]);
      this.DefaultLayer = this.layerOptions[0].displayName;
    });
  }

  /**
   * Initial setup to get the map going
   */
  protected initialSetup(): void {

    const lbsKey: string = '4SnPOVldyLX7qlZocZBTSA4TKMq8EQJuURinOs0Wl78';

    this.Config = { 'subscription-key': lbsKey, interactive: true, zoom: 5, center: [-102.1, 39.5],
                    'subscriptionKey': lbsKey,
                    authOptions: {
                    'authType': 'subscriptionKey',
                    'subscriptionKey': lbsKey
                  }
   };
    
    this.MapService.load().toPromise().then(() => { });
    //    if (this.Slider) {
    //      this.Slider.input.subscribe(() => {
    //        const value = this.Slider.value;

    //       // this.setSliderTime(value);
    //      });
    //    }

    this.loadDataSources();

    // this.loadBlend();

    if (this.SearchModel) {
      setTimeout(() => {
        this.testRouteData();
      }, 1000);
    }
    // });

    //  this.drawRegionToggleSubscription = this.notificationService.GeofenceDrawingStarted.subscribe(data => {
    //    this.geofenceDrawingSetup(data);
    //  });

    this.routeSubscription = this.notificationService.RouteChanged.subscribe(data => {

      // if (!data || !this.FathymForecastConfig && !this.FathymForecastConfig.ServerURL) { return; }

      if (!data) { return; }

      if (!data.IsSearching) {
        this.clearRoutes();
        this.notificationService.ClearForecastDetails();
        return;
      }

      this.SearchModel = data;
      this.testRouteData();
    });
  }

  //  API Methods
  public MapClicked(evt: atlas.data.Position) {

    // console.log(evt)
    // determine the route selected only if there is more than 1 route
    if (this.Routes.length > 1) {
      this.determineRoute(evt);
    }
    // this.mapClick.emit(e);console.log(this.Maper)
  }
  protected determineRoute(coords: atlas.data.Position) {
    this.Routes.forEach(route => {
      route.pointsArr.forEach(point => {

        if (point[0].toFixed(1) === coords[0].toFixed(1) && point[1].toFixed(1) === coords[1].toFixed(1)) {
          // console.log('match');
          this.RouteChosen(route);
        }
      })
    })
  }
  protected makeMaptileOptions(layerStr, t) {
    return {
      tileUrl: `https://fathym-forecast-int.azure-api.net/api/v0/maptile-fetch/${layerStr}/${t}/{z}/{x}/{y}.png`,
      opacity: 0.7,
      tileSize: 256
    }
  }

  protected setUpLayers() {
    this.getManifestJson().subscribe(res => {
      this.manifestJson = res;
      // console.log(res)
      this.pushRadarOptions();
      this.pushFathymAPIOptions();
      // this.pushTerrainOptions();
    });
  }

  protected pushFathymAPIOptions() {
    if (this.manifestJson !== {}) {
      Object.keys(this.manifestJson).forEach(key => {
        if (key === 'CloudCover_EntireAtmosphere') {
          this.layerOptions.push({
            displayName: 'Forecast Cloud Cover',
            value: 'CloudCover_EntireAtmosphere',
            optionType: 'ff-api'
          });
        }
        if (key === 'Precipitation_Surface') {
          this.layerOptions.push({
            displayName: 'Forecast Precipitation',
            value: 'Precipitation_Surface',
            optionType: 'ff-api'
          });
        }
        if (key === 'Temperature_2Meters') {
          this.layerOptions.push({
            displayName: 'Forecast Temperature',
            value: 'Temperature_2Meters',
            optionType: 'ff-api'
          });
        }
        if (key === 'Visibility_Surface') {
          this.layerOptions.push({
            displayName: 'Forecast Visibility',
            value: 'Visibility_Surface',
            optionType: 'ff-api'
          });
        }
        if (key === 'Wind_10Meters') {
          this.layerOptions.push({
            displayName: 'Forecast Wind',
            value: 'Wind_10Meters',
            optionType: 'ff-api'
          });
        }
      });
    }
  }

  protected pushRadarOptions() {
    this.layerOptions.push(
      {
        displayName: 'Radar Reflectivity',
        value: 'Radar Reflectivity',
        optionType: 'ia-state'
      },
      // { // commenting out for now for story 5953
      //   displayName: 'Radar Precipitation',
      //   value: 'Radar Precipitation',
      //   optionType: 'ia-state'
      // }
    );
  }

  protected pushTerrainOptions() {
    this.layerOptions.push(
      {
        displayName: 'Toggle terrain',
        value: 'Toggle terrain',
        optionType: 'ms-azure'
      },
      {
        displayName: 'Toggle map labels',
        value: 'Toggle map labels',
        optionType: 'ms-azure'
      }
    );
  }

  protected getManifestJson() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Ocp-Apim-Subscription-Key', this.subscriptionKey);
    return this.http.get(`${this.techAccentAPI}`, { headers }).pipe(
      map(res => {
        return res;
      }));
  }

  public LayerChosen(layer) {
    if (layer) {
      if (layer.optionType === 'ff-api') {
        this.currentForecastLayer = layer;
      } else {
        this.currentForecastLayer = null;
      }
      if (layer.optionType === 'ff-api') {
        this.getLayerFromFathymAPI(layer);
      } else if (layer.optionType === 'ia-state') {
        this.getLayerFromIowaAPI(layer);
      } else if (layer.optionType === 'ms-azure') {
        this.getLayerFromAzure(layer);
      }
    }
  }

  protected getLayerFromIowaAPI(layer) {
    // console.log(layer);
    let url;
    // if (layer.value === 'Radar Reflectivity') {
    url = 'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/{z}/{x}/{y}.png';
    // } else if (layer.value === 'Radar Precipitation') {
    //   url = 'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/q2-n1p-900913/{z}/{x}/{y}.png';
    // }
    const options = {
      tileUrl: url,
      tileSize: 256
    }
    this.Maper.map.layers.add(new atlas.layer.TileLayer(options, 'maptiles'));
  }

  protected getLayerFromFathymAPI(layer, timeIndex?: number) {
    const t = timeIndex ? this.manifestJson[layer.value][timeIndex] : this.manifestJson[layer.value][0];
    this.Maper.map.layers.add(new atlas.layer.TileLayer({
      tileUrl: `https://fathym-forecast-int.azure-api.net/api/v0/maptile-fetch/${layer.value}/${t}/{z}/{x}/{y}.png?subscription-key=${this.subscriptionKey}`,
      opacity: 0.7,
      tileSize: 256
    }, 'maptiles'));
  }

  protected getLayerFromAzure(layer) {

  }

  public MapLoaded(evt: Event) {
    if (this.Maper && this.MapService.isLoaded) {
      console.log('Map loaded', evt);
      this.setUpDefaultLayer();
      // this.loadBlend();
    } else {
      setTimeout(() => this.MapLoaded(evt), 400);
    }
  }

  public DefaultLayer;


  /**
   * Callback function that passes back created points
   *
   * @param activeShapeArray geofence points returned from the created shape
   */
  // protected drawRegionCallback(activeShapeArray: Array<Array<number>>): void {
  //   console.log('activeShapeArray', activeShapeArray);

  //   this.dataService.ShapeRegion(activeShapeArray).subscribe(data => {

  //     console.log('activeShapeArray ', data);

  //   });

  // }

  // protected loadBlend() {
  //   const blend = this.dataService.Blend();

  //   if (blend) {
  //     blend.subscribe(response => {
  //       this.ImageVarNames = response.ImageVarNames;

  //       this.ImageValidTimes = response.ImageValidTimes;

  //      //  this.setSliderTime(0);
  //     });
  //   }
  // }

  public SelectImage(varName: any) {
    this.SelectedVarName = varName;

    // this.setSliderTime(this.Slider.value);
  }

  //  Helpers
  protected closest(arr, closestTo) {
    let closest = Math.max.apply(null, arr); // Get the highest number in arr in case it match nothing.

    let ci = -1;

    for (let i = 0; i < arr.length; i++) {
      // Loop the array
      if (arr[i] >= closestTo && arr[i] < closest) {
        closest = arr[i]; // Check if it's higher than your number, but lower than your closest value

        ci = i;
      }
    }

    return [closest, ci]; // return the value
  }

  /**
   * Create routes to display on the map
   *
   * @param pointsArr array of all points that make up routes
   */
  // protected displayRoute(pointsArr: Array<Array<atlas.data.Position>>) {
  protected displayRoute(routes: Array<RouteInfoModel>) {
    // console.log('display routes: ', routes);

    if (!this.Maper || !this.Maper.map) { return; }

    this.Maper.map.events.add('ready', () => {
      // console.log('map is ready and loaded - shannon ');
    });

    /**
     * Colors for route lines
     * TODO: make this dynamic for unknown number of routes
     */
    // const routeProps: Array<object> = [
    //   { strokeColor: '#0000CD', strokeWidth: 5 },
    //   { strokeColor: '#00FF00', strokeWidth: 5 },
    //   { strokeColor: '#FF007F', strokeWidth: 5 }];

    /**
     * Remove any routes on the map
     */
    this.clearRoutes();

    /**
     * Removes any Markers on the map
     */
    this.Maper.map.removeLayers(['currentMark']);

    // if (this.routeNames && this.routeNames.length > 0) {
    //   for (let i = 0; i < this.routeNames.length; i++) {
    //     this.Maper.map.removeLayers([this.routeNames[i]]);
    //     this.Maper.map.removeLayers(['routeStart', 'routeEnd']);
    //   }
    // }

    // /**
    //  * Clear routeNames array
    //  */
    // this.routeNames = [];
    routes.forEach(route => {

      // console.log('route name = ', route.displayName);
      // for (let i = route.pointsArr.length-1; i >=0; i--) {
      // for (let i = 0; i <route.pointsArr.length; i++) {

      /**
       * Set new data source to the map
       */
      const dataSource = new atlas.source.DataSource();
      this.Maper.map.sources.add(dataSource);

      /**
       * Build route names
       */
      const routeName = route.displayName;
      this.routeNames.push(routeName);

      /**
       * Set colors for each route line
       */

      // const routeColor: string = routeProps[i]['strokeColor'];
      // const routeWidth: number = routeProps[i]['strokeWidth'];

      const routeColor: string = route.color;
      // console.log('route color: ', route.color);
      const routeWidth: number = 5;

      /**
       * Points to plot
       */
      const points = route.pointsArr;
      // console.log('points here: ', points)
      const decodedPath = points;
      for (let j = 0; j < decodedPath.length; j++) {
        const llat = decodedPath[j][1];
        // console.log('llat: ', llat);

        const llon = decodedPath[j][0];
        // console.log('llon: ', llon);

        if (llat < this.minLat) { this.minLat = llat; }

        if (llat > this.maxLat) { this.maxLat = llat; }

        if (llon < this.minLong) { this.minLong = llon; }

        if (llon > this.maxLong) { this.maxLong = llon; }
      }


      const start: atlas.data.Position = decodedPath[0];
      const end: atlas.data.Position = decodedPath[decodedPath.length - 1];


      /**
       * Set route start and end points
       */
      this.startMarker = new atlas.data.Feature(new atlas.data.Point(start));

      this.Maper.map.addPins([this.startMarker], {
        name: 'routeStart'
      });

      this.endMarker = new atlas.data.Feature(new atlas.data.Point(end));

      this.Maper.map.addPins([this.endMarker], {
        name: 'routeEnd'
      });

      /**
       * Build line(s) for route(s)
       */
      const line = new atlas.data.LineString(points);
      const fline = new atlas.data.Feature(line);

      this.Maper.map.addLinestrings([fline], {
        name: routeName,
        width: routeWidth,
        color: routeColor
      });

      /** */
      // dataSource.add([new atlas.data.LineString(points)]);

      // this.Maper.map.layers.add(line, 'labels');
      // /** */



      const sw = new atlas.data.Position(this.minLong - 0.75, this.minLat - 0.75);

      const ne = new atlas.data.Position(this.maxLong + 0.75, this.maxLat + 0.75);

      const bbox = new atlas.data.BoundingBox(sw, ne);

      this.Maper.map.setCameraBounds({
        bounds: bbox
      });

      this.Route = points;
      // }
    })

  }

  protected clearRoutes(): void {
    if (this.routeNames && this.routeNames.length > 0) {
      for (let i = 0; i < this.routeNames.length; i++) {
        this.Maper.map.removeLayers([this.routeNames[i]]);
        this.Maper.map.removeLayers(['routeStart', 'routeEnd']);
      }
    }

    /**
     * Clear routeNames array
     */
    this.routeNames = [];
  }

  protected testRouteData(): void {
    this.IsLoading = true;
    this.dataService.RouteData(this.SearchModel)
      .subscribe((res) => {
        console.log('test route data', res);
        this.handleTestRouteResponse(res);
        this.IsLoading = false;
      });
  }

  protected handleRoute() {
    this.IsLoading = true;

    this.dataService.HandleRoute(this.SearchModel)
      .pipe(
        map(res => res),
        catchError(err => {
          this.toastrDisplayService.DisplayToastrError('caught mapping error and rethrowing');
          console.log('caught mapping error and rethrowing', err);
          return throwError(err);
        }),
        catchError(err => {
          this.toastrDisplayService.DisplayToastrError('caught rethrown error, providing fallback value');
          console.log('caught rethrown error, providing fallback value');
          this.IsLoading = false;
          return of([]);
        })
      )
      .subscribe(
        (res) => {
          this.IsLoading = false;

          this.toastrDisplayService.DisplayToastrSuccess('success');
          // this.ffRouteSearch.Search(res as RouteDataModel);
          // this.handleRouteResponse(res);
        },
        err => {
          this.toastrDisplayService.DisplayToastrError('HTTP error');
          console.log('HTTP Error', err);
        },
        () => {
          console.log('HTTP request completed.');
          this.IsLoading = false;
        });
  }
  /**
   * convert the points to only coords
   * @param val 
   */
  protected testNewPoints(val: any): Array<any> {
    const points = [];
    // console.log('val.routes', val.routes);
    // const pos = new atlas.data.Position(1, 1);
    for (const point of val.points) {
      points.push([point.lng, point.lat]);
    }

    return points;
  }
  /**
   * 
   * Sets up the map with routes initially based on @param response from the search form
   */
  protected handleTestRouteResponse(response: any) {

    this.Routes = new Array<RouteInfoModel>();

    response.routes.forEach(route => {
      this.Routes.push(route);
      //convert the points to only coords
      let points = this.testNewPoints(route);

      //assign the route its own array of coords
      this.Routes[this.Routes.indexOf(route)].pointsArr = points;

      this.calculateDelayRisk(route);
    })


    this.DefaultRoute = this.determineDefaultRoute();
    this.changeSelectedRoute(this.DefaultRoute);
    this.nameRoutes();
    this.moveSelectedRouteToEnd();
    // update plot and delay risk data
    this.notificationService.UpdateForecastPlotData(this.DefaultRoute);
    this.displayRoute(this.Routes);

  }
  /**gives route a name  */
  protected nameRoutes(): void {
    let i = 0;
    this.Routes.forEach(route => {
      i++;
      route.displayName = 'Route ' + i.toString();
    })
    console.log('routes= ', this.Routes)
  }
  /**
   * calculates the delay risk for the given route
   * @param route 
   */
  protected calculateDelayRisk(route: any) {
    let riskSum: number = 0;
    route.forecast.routeDelayRisk.forEach(risk => {
      riskSum += risk;
    })
    let delayRiskAvg = riskSum / (route.forecast.routeDelayRisk.length);
    route.avgDelayRisk = delayRiskAvg.toFixed(4);
    //  console.log('route: ', route);
  }
  /**
   * determines the default route based on delay risk
   */
  protected determineDefaultRoute(): RouteInfoModel {
    let dRoute = this.Routes[0];
    this.Routes.forEach(route => {
      if (route.avgDelayRisk <= dRoute.avgDelayRisk) {
        dRoute.selectedRoute = false;
        dRoute = route;
        route.selectedRoute = true;
      }
      else {
        route.selectedRoute = false;
      }
    })

    return dRoute;
  }
  /**
   * Changes the previous selected route to false and changes the defaultRoute to the given route alson assigning color
   * @param route 
   */
  protected changeSelectedRoute(route: RouteInfoModel) {
    this.Routes.forEach(r => {
      if (r.selectedRoute === true) {
        r.selectedRoute = false;
        r.color = 'gray';
      }
      else if (r.selectedRoute === false || !r.selectedRoute) {
        r.color = 'gray';
      }
    });
    route.color = '#0000CD';
    route.selectedRoute = true;
    this.DefaultRoute = route;
  }
  /**
   * moves the selected route to the end of the array so it appears on top of all other routes
   */
  protected moveSelectedRouteToEnd() {
    let tempRoute: RouteInfoModel;
    this.Routes.forEach(route => {
      if (route.selectedRoute === true) {
        tempRoute = route;
        this.Routes.splice(this.Routes.indexOf(route), 1);
      }
    })
    this.Routes.push(tempRoute);
  }
  /**
   * When the user selects a new route to show data for
   * @param route 
   */
  public RouteChosen(route: RouteInfoModel): void {
    this.changeSelectedRoute(route);
    this.moveSelectedRouteToEnd();
    this.displayRoute(this.Routes);
    this.notificationService.UpdateForecastPlotData(this.DefaultRoute);
  }


  /**
   * Setup route points for creating route lines
   *
   * @param response route data being returned
   */
  protected handleRouteResponse(response: object) {

    if (!response['data'] || response['data'].length === 0) {
      return;
    }

    // update plot and delay risk data
    this.notificationService.UpdateForecastPlotData(response);

    const pointsArr: Array<Array<atlas.data.Position>> = [];

    for (let i = 0; i < response['data'].length; i++) {
      const element = response['data'][i];
      this.FcstData = element;
      this.ValidTimes = element['vtimes'];

      // const points = this.decode(element['points']);

      // pointsArr.push(points);
      // console.log('points ', points);

    }
    console.log('pointsArr', pointsArr);
    // this.displayRoute(pointsArr);
  }

  protected loadDataSources() {
    // const sub: Subscription = this.dataService.LoadDataSources().subscribe(dataSources => {
    //    this.dataSources = dataSources;

    //    console.log('dataSource ', this.dataSources);

    //    this.selectDataSource(dataSources[2]);
    // });

    // sub.unsubscribe();
  }

  protected selectDataSource(dataSource) {
    this.dataSource = dataSource;
  }

  /**
   * On chart mouse move add icon to route location
   *
   * @param index for route point
   */
  protected setCurrentMarker(index: number) {
    // setInterval(() => {
    this.Maper.map.removeLayers(['currentMark']);

    // }, 500)

    const point = this.Route[index];

    if (!point) { return; }

    this.currentMarker = new atlas.data.Feature(new atlas.data.Point(point), {
      //  title: 'Condition Point',
      //  iconImage: 'pin-red'
    });

    this.Maper.map.addPins([this.currentMarker], {
      name: 'currentMark'
    });
  }

  /**
   * On chart mouse move set time on route
   * @param vtime absolute second time
   */
  protected setTimeFromChart(vtime: number) {
    const cl = this.closest(this.ImageValidTimes, vtime);

    const i = cl[1];

    // this.Slider.value = i;

    // this.setSliderTime(i);
  }

  /**
   *
   * @param data Setup or remove the drawing tool
   */
  protected geofenceDrawingSetup(data: SearchModel): void {

    if (!this.geofenceDrawingTool) {
      this.geofenceDrawingTool = new GeofenceDrawingTool(this.Maper, 'null', (param) => {
        this.geofenceDrawingCallback(param, data);
      });
    }

    this.ShowIndicatorIcon = data.IsSearching;

    if (data.IsSearching) {
      this.geofenceDrawingTool.StartDrawing();

    } else if (!data.IsSearching) {
      this.geofenceDrawingTool.Clear();
      this.geofenceDrawingTool = null;
      this.notificationService.ClearForecastDetails();
    } else {
      return;
    }
  }

  /**
   *
   * @param data array of points returned from the drawn geofence
   */
  protected geofenceDrawingCallback(callbackData: Array<Array<number>>, searchData: SearchModel): void {
    this.IsLoading = true;

    this.dataService.ShapeRegion(callbackData, searchData)
      .pipe(
        map(res => res),
        catchError(err => {
          this.toastrDisplayService.DisplayToastrError('shape region error');
          this.IsLoading = false;
          console.log('shape region error', err);
          return throwError(err);
        }),
        // catchError(err => {
        //   this.toastrDisplayService.DisplayToastrError('shape region error, providing fallback value');
        //   console.log('shape region error, providing fallback value');
        //   return of([]);
        // })
      )
      .subscribe(
        res => {
          this.notificationService.UpdateForecastPlotData(res);
        },
        err => {
          this.toastrDisplayService.DisplayToastrError('HTTP error');
          console.log('HTTP Error', err);
        },
        () => {
          console.log('HTTP request completed.');
          this.IsLoading = false;
        });
  }

  // protected setSliderTime (value: number) {
  //   if (value == null || this.ImageValidTimes.length <= value) {
  //     return;
  //   }

  //   const validTime = this.ImageValidTimes[value];

  //   if (!validTime) {
  //     return;
  //   }

  //   const dateTime = new Date(validTime * 1000);

  //   const dateStr = this.displayDatePipe.transform(dateTime, [this.FathymForecastConfig.ForecastDisplayDateFormat]);

  //   this.selectedValidTime = dateStr;

  //   if (this.SelectedVarName) {
  //     const imageTimeStr = this.imageDatePipe.transform(dateTime, [this.FathymForecastConfig.ForecastImageDateFormat]);

  //     let url = this.FathymForecastConfig.ServerURL + '/blend/tiled/' + this.SelectedVarName + '/' + imageTimeStr + '/{x}/{y}/{z}';

  //     this.imageLayer = this.Maper.map.layers.add(
  //       new atlas.layer.TileLayer(
  //         {
  //           tileUrl: url,
  //           opacity: 0.7,
  //           tileSize: 256
  //         },
  //         'wximage'
  //       )
  //     );
  //   }
  //}
}
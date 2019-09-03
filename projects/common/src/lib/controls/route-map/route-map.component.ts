import { Component, Injector, ViewChild, ViewChildren, ChangeDetectorRef, AfterViewInit, QueryList, OnInit } from '@angular/core';
import { MatSlider } from '@angular/material';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { of } from 'rxjs/internal/observable/of';
import { Subscription } from 'rxjs/internal/Subscription';
import { ToastrDisplayService } from '../../services/toastr-display.service';
import { NotificationService } from '../../services/notification.service';
import { ImageDateFormatPipe, DisplayDateFormatPipe } from '../../utils/pipes/wc-pipes';
import { DataService } from '../../services/data.service';
import { WeatherCloudConfig } from '../../models/weather.config';
import { SearchModel } from './../../models/search.model';
import { GeofenceDrawingTool } from '../../utils/map/geofence-drawing-tool.utils';
import { LoadMapService, AtlasMapComponent } from '@acaisoft/angular-azure-maps';


@Component({
  selector: 'lcu-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.scss']
})
export class RouteMapComponent {

   //  Fields
   protected dataSource: any;

   protected dataSources: any;
 
   //  Properties
 
   /**
    * Map component
    */
   @ViewChild('map', {static: false})
   public Maper: AtlasMapComponent;
 
   /**
    * Plot component
    */
   // @ViewChild(ForecastDataPlotComponent)
   // public Plot: ForecastDataPlotComponent;
 
   /**
    * Image slider component
    */
   @ViewChild('imageSlider', {static: false})
   public Slider: MatSlider;
 
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
    * Check if things are loaded
    */
   private _isLoading: boolean = false;
   public set IsLoading(val: boolean) {
     this._isLoading = val;
   }
 
   public get IsLoading(): boolean {
     return this._isLoading;
   }
 
   /**
    * Loading class
    */
   // public Loading: Loading;
 
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
 
   /**
    * Configuration object for weather cloud
    */
   public WeatherCloudConfig: WeatherCloudConfig;
 
   /**
    * Class for drawing region shapes on the map
    */
   protected geofenceDrawingTool: GeofenceDrawingTool;
 
   public ShowIndicatorIcon: boolean;
 
   //  Constructors
   constructor(
     public MapService: LoadMapService,
     protected dataService: DataService,
     protected displayDatePipe: DisplayDateFormatPipe,
     protected imageDatePipe: ImageDateFormatPipe,
     protected notificationService: NotificationService,
     protected toastrDisplayService: ToastrDisplayService
   ) {
 
     this.dataSources = {};
 
     this.ImageValidTimes = [];
 
     this.ImageVarNames = [];
 
     // this.Loading = new Loading();
 
   }
 
   //  Life Cycle
   public ngOnInit(): void {
 
     setTimeout(() => {
       this.initialSetup();
     }, 500);
   }
 
   /**
    * Initial setup to get the map going
    */
   protected initialSetup(): void {
 
   // this.wcConfig.Loading.subscribe(loading => this.Loading.Set(loading));
  //  this.wcConfig.Loading.subscribe(loading => this.IsLoading = loading);
 
  //  this.wcConfig.Context.subscribe(ctxt => {
  //    this.WeatherCloudConfig = ctxt;
 
  //    console.log('map init, weatherCloudConfig', this.WeatherCloudConfig);
 
  //    if (!this.WeatherCloudConfig) { return; }
 
      const lbsKey: string = '4SnPOVldyLX7qlZocZBTSA4TKMq8EQJuURinOs0Wl78';
      const serverURL: string = 'https://wxlb01.fathym.com/route';

    // public ServerURL?: string = 'https://wxlb01.fathym.com/route';
    // public ServerURL?: string = 'http://fathymwx.westus.cloudapp.azure.com/blend/routefcst';
    // public ServerURL?: string = 'https://azuremaps.fathym.com/route';
    // public ServerURL?: string = 'https://cors.io/?http://wxcloud-hrrr.westus.cloudapp.azure.com';

      this.Config = {
       'subscription-key': lbsKey,
       interactive: true,
       zoom: 5,
       center: [-102.1, 39.5]
     };
 
      this.MapService
     .load()
     .toPromise()
     .then(() => {});
 
  //    if (this.Slider) {
  //      this.Slider.input.subscribe(() => {
  //        const value = this.Slider.value;
 
  //       // this.setSliderTime(value);
  //      });
  //    }
 
  //    // this.loadDataSources();
 
  //      // this.loadBlend();
 
  //      // if (this.SearchModel) {
  //      //   this.handleRoute();
  //      //
  //  });
 
  //  this.drawRegionToggleSubscription = this.notificationService.GeofenceDrawingStarted.subscribe(data => {
  //    this.geofenceDrawingSetup(data);
  //  });
 
  //  this.routeSubscription = this.notificationService.RouteChanged.subscribe(data => {
 
  //  if (!data || !this.WeatherCloudConfig && !this.WeatherCloudConfig.ServerURL) { return; }
 
  //  if (!data.IsSearching) {
  //      this.clearRoutes();
  //      this.notificationService.ClearForecastDetails();
  //      return;
  //  }
 
  //  this.SearchModel = data;
  //  this.handleRoute();
  // });
   }
 
   //  API Methods
   public MapClicked(evt: atlas.data.Position) {
     // this.mapClick.emit(e);
   }
 
   public MapLoaded(evt: Event) {
     console.log('Map loaded', evt);
   // this.loadBlend();
   }
 
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
 
   protected decode(encoded) {
     const points = [];
 
     let index = 0,
       len = encoded.length;
 
       let lat = 0,
       lng = 0;
 
     while (index < len) {
       let b,
         shift = 0,
         result = 0;
       do {
         b = encoded.charAt(index++).charCodeAt(0) - 63;
 
         result |= (b & 0x1f) << shift;
 
         shift += 5;
       } while (b >= 0x20);
 
       let dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
 
       lat += dlat;
 
       shift = 0;
 
       result = 0;
 
       do {
         b = encoded.charAt(index++).charCodeAt(0) - 63;
 
         result |= (b & 0x1f) << shift;
 
         shift += 5;
       } while (b >= 0x20);
       const dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
 
       lng += dlng;
 
       const llat = lat / 1e5;
 
       const llon = lng / 1e5;
 
       const pos = new atlas.data.Position(llon, llat);
 
       points.push(pos);
     }
 
     return points;
   }
 
   /**
    * Create routes to display on the map
    *
    * @param pointsArr array of all points that make up routes
    */
   protected displayRoute(pointsArr: Array<Array<atlas.data.Position>>) {
 
      if (!this.Maper) {
       return;
      }
 
      this.Maper.map.events.add('ready', () => {
       console.log('map is ready and loaded - shannon ');
      });
 
      /**
       * Colors for route lines
       * TODO: make this dynamic for unknown number of routes
       */
      const routeProps: Array<object> = [
                                         {strokeColor: '#0000CD', strokeWidth: 5},
                                         {strokeColor: '#6842f4', strokeWidth: 4},
                                         {strokeColor: '#60060b', strokeWidth: 3}];
 
      /**
       * Remove any routes on the map
       */
      this.clearRoutes();
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
 
      for (let i = 0; i < pointsArr.length; i++) {
 
       /**
        * Set new data source to the map
        */
       const dataSource = new atlas.source.DataSource();
       this.Maper.map.sources.add(dataSource);
 
       /**
        * Build route names
        */
       const routeName: string = 'routeLine' + String(i);
       this.routeNames.push(routeName);
 
       /**
        * Set colors for each route line
        */
       const routeColor: string = routeProps[i]['strokeColor'];
       const routeWidth: number = routeProps[i]['strokeWidth'];
 
       /**
        * Points to plot
        */
       const points = pointsArr[i];
       const decodedPath = points;
 
       let min_lat = 9999;
 
       let min_lon = 9999;
 
       let max_lat = -9999;
 
       let max_lon = -9999;
 
       for (let j = 0; j < decodedPath.length; j++) {
         const llat = decodedPath[j][1];
 
         const llon = decodedPath[j][0];
 
         if (llat < min_lat) { min_lat = llat; }
 
         if (llat > max_lat) { max_lat = llat; }
 
         if (llon < min_lon) { min_lon = llon; }
 
         if (llon > max_lon) { max_lon = llon; }
       }
 
       const nn = decodedPath.length;
 
       const start = decodedPath[0];
 
       const end = decodedPath[nn - 1];
 
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
       // const line = new atlas.layer.LineLayer(dataSource, routeName, {
       //   strokeColor: routeColor,
       //   strokeWidth: 4,
       //   filter: ['==', '$type', 'LineString']
       // });
 
       this.Maper.map.addLinestrings([fline], {
         name: routeName,
         width: routeWidth,
         color: routeColor
       });
 
       /** */
        // dataSource.add([new atlas.data.LineString(points)]);
 
        // this.Maper.map.layers.add(line, 'labels');
       // /** */
 
       const sw = new atlas.data.Position(min_lon - 0.75, min_lat - 0.75);
 
       const ne = new atlas.data.Position(max_lon + 0.75, max_lat + 0.75);
 
       const bbox = new atlas.data.BoundingBox(sw, ne);
 
       this.Maper.map.setCameraBounds({
         bounds: bbox
       });
 
       this.Route = points;
     }
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
           // this.wcRouteSearch.Search(res as RouteDataModel);
           this.handleRouteResponse(res);
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
 
      const points = this.decode(element['points']);
 
      pointsArr.push(points);
       // console.log('points ', points);
 
     }
     this.displayRoute(pointsArr);
   }
 
   // protected loadDataSources() {
   //  const sub: Subscription = this.dataService.LoadDataSources().subscribe(dataSources => {
   //     this.dataSources = dataSources;
 
   //     console.log('dataSource ', this.dataSources);
 
   //     this.selectDataSource(dataSources[2]);
   //  });
 
     // sub.unsubscribe();
   // }
 
   protected selectDataSource(dataSource) {
     this.dataSource = dataSource;
   }
 
   protected setCurrentMarker(index) {
     this.Maper.map.removeLayers(['currentMark']);
 
     const point = this.Route[index];
 
     this.currentMarker = new atlas.data.Feature(new atlas.data.Point(point));
 
     this.Maper.map.addPins([this.currentMarker], {
       name: 'currentMark'
     });
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
 
   // protected setTimeFromChart(vtime) {
   //   const cl = this.closest(this.ImageValidTimes, vtime);
 
   //   const i = cl[1];
 
   //   this.Slider.value = i;
 
   //  // this.setSliderTime(i);
   // }
 
   // protected setSliderTime (value: number) {
   //   if (value == null || this.ImageValidTimes.length <= value) {
   //     return;
   //   }
 
   //   const validTime = this.ImageValidTimes[value];
 
   //   if (!validTime) {
   //     return;
   //   }
 
   //   const dateTime = new Date(validTime * 1000);
 
   //   const dateStr = this.displayDatePipe.transform(dateTime, [this.WeatherCloudConfig.ForecastDisplayDateFormat]);
 
   //   this.selectedValidTime = dateStr;
 
   //   if (this.SelectedVarName) {
   //     const imageTimeStr = this.imageDatePipe.transform(dateTime, [this.WeatherCloudConfig.ForecastImageDateFormat]);
 
   //     let url = this.WeatherCloudConfig.ServerURL + '/blend/tiled/' + this.SelectedVarName + '/' + imageTimeStr + '/{x}/{y}/{z}';
 
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

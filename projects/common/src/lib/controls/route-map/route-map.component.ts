import { Component, Injector, ViewChild, ViewChildren, ChangeDetectorRef, AfterViewInit, QueryList, OnInit, OnDestroy } from '@angular/core';
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
import { ChartMouseMoveModel } from '../../models/chart-mouse-move.model';


@Component({
  selector: 'lcu-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.scss']
})
export class RouteMapComponent implements OnInit, OnDestroy {

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

      this.minLat = 9999;

      this.minLong = 9999;

      this.maxLat = -9999;

      this.maxLong = -9999;
 
     // this.Loading = new Loading();
 
   }
 
   //  Life Cycle
   public ngOnInit(): void {
 
     setTimeout(() => {
       this.initialSetup();
     }, 500);

     this.chartMouseMovedSubsription = this.notificationService.ChartMouseChanged.subscribe(
      (data: ChartMouseMoveModel) => {
        if (!data) {
          console.error('mouse moved - No data returned'); return;
        }
        
        console.log('data', data);

        this.setCurrentMarker(data.Index);
        this.setTimeFromChart(data.Value);
        }
      );
   }

   public ngOnDestroy(): void {
     this.chartMouseMovedSubsription.unsubscribe();
   }
 
   /**
    * Initial setup to get the map going
    */
   protected initialSetup(): void {

      const lbsKey: string = '4SnPOVldyLX7qlZocZBTSA4TKMq8EQJuURinOs0Wl78';

      this.Config = { 'subscription-key': lbsKey, interactive: true, zoom: 5, center: [-102.1, 39.5] };
      this.MapService.load().toPromise().then(() => {});
 
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

        // if (!data || !this.WeatherCloudConfig && !this.WeatherCloudConfig.ServerURL) { return; }

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

   /**
    * Create routes to display on the map
    *
    * @param pointsArr array of all points that make up routes
    */
   protected displayRoute(pointsArr: Array<Array<atlas.data.Position>>) {
 
      if (!this.Maper) { return; }
 
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
 
       for (let j = 0; j < decodedPath.length; j++) {
         const llat = decodedPath[j][1];
 
         const llon = decodedPath[j][0];
 
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
           // this.wcRouteSearch.Search(res as RouteDataModel);
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
 
   protected testNewPoints(val: any): Array<any> {
    const points = [];
    // console.log('val', val);
   // const pos = new atlas.data.Position(1, 1);

    for (const point of val.points) {
    points.push([point.lng, point.lat]);
   }


    return points;
   }

   protected handleTestRouteResponse(response: object) {
 
     const pointsArr: Array<Array<atlas.data.Position>> = [];
 
     const points = this.testNewPoints(response);

     pointsArr.push(points);

     // update plot and delay risk data
     this.notificationService.UpdateForecastPlotData(response);

     this.displayRoute(pointsArr);
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
     this.Maper.map.removeLayers(['currentMark']);
 
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
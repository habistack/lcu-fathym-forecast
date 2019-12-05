import { Component, OnInit, Injector } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { SearchConstants } from '../../constants/search.constants';
import { DatasourceTypesModel } from '../../models/datasource-types.model';
import { DepartureTimeModel } from '../../models/departure-time.model';
import { FathymForecastConfig } from '../../models/weather.config';
import { RouteModel } from '../../models/route.model';
import { RouteDataModel } from '../../models/route-data.model';

import { NotificationService } from '../../services/notification.service';
import { ToastrDisplayService } from '../../services/toastr-display.service';
import { LocationSearchService } from '../../services/location-search.service';
import { RequiredCheckedValidator } from '../../utils/validators/required-checked.validator';
import { SearchModel } from '../../models/search.model';
import { RouteResultsModel } from '../../models/route-results.model';
import { DataService } from '../../services/data.service';
import { DisplayDateFormatPipe } from '../../utils/pipes/ff-pipes';

@Component({
  selector: 'lcu-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
/**
 * Access Origin field within the form group
 */
  public get Origin(): AbstractControl {
    return this.RouteInputForm.get('SearchFormControls.origin');
  }

  /**
   * Access Destination field within the form group
   */
  public get Destination(): AbstractControl {
    return this.RouteInputForm.get('SearchFormControls.destination');
  }

  /**
   * Access ConditionVariableNames field
   */
  public get ConditionVariableNames(): AbstractControl {
    return this.RouteInputForm.get('SearchConditions.conditionVariables');
  }

  /**
   * Access ForecastModelType field
   */
  public get ForecastModelType(): AbstractControl {
    return this.RouteInputForm.get('SearchFormControls.forecastModelType');
  }

  /**
   * Access CheckSearchRoutes checkbox
   */
  public get SearchTypeRouteCheck(): AbstractControl {
    return this.RouteInputForm.get('SearchTypeControls.checkSearchRoutes');
  }

  /**
   * Access CheckSearchDepart checkbox
   */
  public get SearchTypeDepartCheck(): AbstractControl {
    return this.RouteInputForm.get('SearchTypeControls.checkSearchDepart');
  }

  /**
   * Access CheckSearchGeofence checkbox
   */
  public get SearchTypeGeofenceCheck(): AbstractControl {
    return this.RouteInputForm.get('SearchTypeControls.checkSearchGeofence');
  }

  /**
   * Access DepartureTimes field
   */
  public get DepartureTimes(): AbstractControl {
    return this.RouteInputForm.get('SearchConditions.departureTimes');
  }

  //  Properties

  /**
   * Label for departure table button
   */
  public ButtonLabelDepartTable: string = SearchConstants.SHOW_DEPARTURE_TABLE;

  /**
   * Label for geofence button
   */
  public ButtonLabelGeofence: string = SearchConstants.START_POLYGON_DRAWING;

  /**
   * Lable for routes button
   */
  public ButtonLabelRoutes: string = SearchConstants.SHOW_ROUTES;

  /**
   * Primary Material raised button type
   */
  public ButtonTypePrimary: string = SearchConstants.BUTTON_PRIMARY;

  /**
   * Warn Material raised button type
   */
  public ButtonTypeWarn: string = SearchConstants.BUTTON_WARN;

  /**
   * Config for conditions select options
   */
  public ConditionsConfig: any = SearchConstants.CONDITION_CONFIG;

  public DepartureTimeConfig: any = SearchConstants.DEPARTURE_TIMES_CONFIG;

  public ForecastModelConfig: any = SearchConstants.FORECAST_MODEL_CONFIG;

  /**
   * Selected value from data source select
   */
  protected dataSourceSelected: DatasourceTypesModel;

  /**
   * Values for data source select
   */
  public ForecastModelList: any = {};

  /**
   * Can / cannot use the geofence tool
   */
  protected canUseGeofence: boolean;

  public DepartureTimesList: Array<DepartureTimeModel>;

  public DestinationControl: FormControl;

  public DestinationCurrent: any;

  public DestinationOptions: string[];

  public IsDrawingGeofence: boolean = false;

  public IncludeAlternatives: boolean;

  // public Loading: Loading;

  public OriginControl: FormControl;

  public OriginCurrent: any;

  public OriginOptions: string[];

  public FathymForecastConfig: FathymForecastConfig;

  public RouteInputForm: FormGroup;

  public SearchFormControls: FormGroup;

  public SearchTypeControls: FormGroup;

  public SearchConditions: FormGroup;

  public SelectAllObj: object =  {key: 'Select All'};

  public OriginRoute: Observable<RouteModel>;

  public DestinationRoute: Observable<RouteModel>;

  public RouteData: Array<RouteDataModel>;

  public searching: boolean = false;

  public searchFailed: boolean = false;

  /**
   * Search title value
   */
  public SearchTitle: string = 'Search Type';

  public GeofenceChecked: boolean;

  public DepartureChecked: boolean;

  public RouteChecked: boolean;

  // public ConditionVariablesNameList: Array<object> = SearchConstants.VAR_NAMES_SELECT;

  protected invalidOriginPosition: boolean;

  protected invalidDesinationPosition: boolean;

  /**
   * When searching route(s)
   */
  protected isSearchingRoute: boolean = false;

  /**
   * When searching departure table
   */
  protected isSearchingDepartTable: boolean = false;

/**
   * End my changes
   */

  constructor(
    protected injector: Injector,
    protected http: HttpClient,
    protected ffSvc: DataService,
    protected notificationService: NotificationService,
    protected toastrDisplayService: ToastrDisplayService,
    protected locationService: LocationSearchService,
    protected displayDatePipe: DisplayDateFormatPipe
  ) {

    this.DestinationControl = new FormControl();

    this.DestinationOptions = [];

    this.OriginControl = new FormControl();

    this.OriginOptions = [];

    // this.Loading = new Loading();

    this.RouteInputForm = new FormGroup({
      SearchFormControls: new FormGroup({
        origin: new FormControl({value: '', disabled: false}, [Validators.required, this.validateOriginLatLong]),
        destination: new FormControl({value: '', disabled: false}, [Validators.required, this.validateDestinationLatLong]),
        includeAlts: new FormControl(false),
        forecastModelType: new FormControl('', {validators: Validators.required})
      }),
      SearchTypeControls: new FormGroup({
        checkSearchGeofence: new FormControl(false),
        checkSearchDepart: new FormControl(false),
        checkSearchRoutes: new FormControl(true),
      }, RequiredCheckedValidator()
    ),
    SearchConditions: new FormGroup({
      conditionVariables: new FormControl('forced initial value for required validator', {validators: Validators.required}),
      departureTimes: new FormControl('', {validators: Validators.required})
    })
  });

    this.ForecastModelType.valueChanges
      .subscribe(val => {
        this.SelectedDataSourceType(val);
      });

    this.OriginRoute = this.Origin.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.searching = true),
        // switchMap(term => this.locationService.Search(term, this.FathymForecastConfig.LBSKey)
        switchMap(term => this.locationService.Search(term, '4SnPOVldyLX7qlZocZBTSA4TKMq8EQJuURinOs0Wl78')
        .pipe(
          tap(() => {
            this.searchFailed = false;
          }),
        catchError(() => {
          this.searchFailed = true;
          return of(new RouteModel());
        })
      ))
    );

    this.DestinationRoute = this.Destination.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.searching = true),
        // switchMap(term => this.locationService.Search(term, this.FathymForecastConfig.LBSKey)
        switchMap(term => this.locationService.Search(term, '4SnPOVldyLX7qlZocZBTSA4TKMq8EQJuURinOs0Wl78')
        .pipe(
          tap(() => this.searchFailed = false),
        catchError(() => {
          this.searchFailed = true;
          return of(new RouteModel());
        })
      ))
    );


    // this.ConditionVariableNames.setValue(this.ConditionsConfig.Source);

    this.onChanges();
  }

  protected onChanges(): void {

  }

  //  Life Cycle
  public ngOnInit(): void {

    // this.ffConfigCtx.Loading.subscribe(loading => this.Loading.Set(loading));

    // this.ffConfigCtx.Context.subscribe(ctxt => (this.FathymForecastConfig = ctxt));

    this.RouteChecked = this.SearchTypeRouteCheck.value;
    this.DepartureChecked = this.SearchTypeDepartCheck.value;
    this.GeofenceChecked = this.SearchTypeGeofenceCheck.value;
    this.defaultSelects();
    this.updateSearchTitle();
  }

  public ngOnDestroy() {
    // this.RouteData = null;
    this.DestinationRoute = null;
    this.OriginRoute = null;

    if (this.RouteInputForm.dirty) {
      this.ResetSearchForm();
    }
  }

  /**
   * Get Datasource types
   */
  public LoadDataSourceTypes() {
    this.ForecastModelList = this.ffSvc.LoadDataSources();

    this.ForecastModelConfig.Source = this.ForecastModelList;

    // set initial value for data types select
    this.SelectedDataSourceType(this.ForecastModelList[2]);

    const toSelect = this.ForecastModelList.find((c: any) => c.Name.toUpperCase() ===
                                                  SearchConstants.FORECAST_MODEL_BLEND.toUpperCase());

   // if (this.RouteInputForm) {
      // set defualt value
      this.ForecastModelType.setValue(toSelect);
   // }

   }

   /**
    *
    * @param dataSourceSelected object from data source types
    */
   public SelectedDataSourceType(select: DatasourceTypesModel): void {

    if (!select) { return; }

     this.dataSourceSelected = new DatasourceTypesModel(select.FcstCfg, select.Host, select.Name, select.URLPrefix, select.VarNames);
   }

   /**
    * Get search form data
    *
    * @param searchType type of search to perform
    */
  protected getFormValues(searchType: string): SearchModel {
    let origin: string = '';
    let destination: string = '';
    let showAlternatives: string = 'false';
    let departTime: string = '';

    if (this.RouteInputForm && this.Origin.value) {
      this.invalidOriginPosition = this.Origin.value.position ? true : false;

      origin = this.Origin.value.position.lat + ',' + this.Origin.value.position.lon;
    }

    if (this.RouteInputForm && this.Destination.value) {
      this.invalidDesinationPosition = this.Destination.value.position ? true : false;

      destination = this.Destination.value.position.lat + ',' + this.Destination.value.position.lon;
    }

    if (this.RouteInputForm && this.RouteInputForm.get('SearchFormControls.includeAlts').value) {
      showAlternatives = this.RouteInputForm.get('SearchFormControls.includeAlts').value;
      console.log('Show alts =', showAlternatives);
      if(showAlternatives === "true"){
        //TODO do something
      }
    }

    if (this.DepartureTimes.value) {
      departTime = this.DepartureTimes.value.Epoch;
    }

    const varNamesArr: Array<string> = [];

    for (let i = 0; i < this.ConditionVariableNames.value.length; i++) {
      if (this.ConditionVariableNames.value[i]['Value']) {
        varNamesArr.push(this.ConditionVariableNames.value[i]['Value']);
      }
    }

    this.dataSourceSelected.VarNames = varNamesArr.join();

    return new SearchModel(origin, destination, departTime, showAlternatives, searchType, this.dataSourceSelected);
  }

  /**
   * Display the selected route
   *
   * @param location address and position of selected route
   */
  public DisplayResults(location: RouteResultsModel): string {
    if (location) {
      return location.address.freeformAddress;
    }
  }

  /**
   * Setting search types from checkboxes, this will be used to simplify the searching process
   *
   * @param evt MatCheckboxChange event
   */
  public SearchTypeChanged(evt: MatCheckboxChange): void {
    switch (evt.source.id.toUpperCase()) {
      case 'CHECKSEARCHGEOFENCE':
        this.GeofenceChecked = !this.GeofenceChecked;
        this.DepartureChecked = this.RouteChecked = false;

        if (this.GeofenceChecked) {
          this.enableGeofenceSearch();
        } else {
          this.clearGeofence();
        }

      break;
      case 'CHECKSEARCHDEPART':
        this.DepartureChecked = !this.DepartureChecked;
        this.GeofenceChecked = false;

        if (!this.DepartureChecked) {
          this.clearDepartureTable();
        }

      break;
      case 'CHECKSEARCHROUTES':
        this.RouteChecked = !this.RouteChecked;
        this.GeofenceChecked = false;

        if (!this.RouteChecked) {
          this.clearRoutes();
        }
      break;
    }

    this.enableSearchTypeCheckboxes();
    this.updateSearchTitle();

  }

  protected updateSearchTitle(): void {

    if (this.GeofenceChecked) {
        this.SearchTitle = 'Geofence';

      } else if (this.DepartureChecked && !this.RouteChecked) {
          this.SearchTitle = 'Search Depart Risk';

      } else if (this.RouteChecked && !this.DepartureChecked) {
          this.SearchTitle = 'Search Route(s)';

      } else if (this.DepartureChecked && this.RouteChecked) {
          this.SearchTitle = 'Search Route(s) and Depart Risk';

      } else if (!this.DepartureChecked && !this.RouteChecked && !this.GeofenceChecked) {
          this.SearchTitle = 'Search Type';
      }
    }

  /**
   * Toggle search type checkboxes
   */
  protected enableSearchTypeCheckboxes(): void {
    this.RouteInputForm.get('SearchFormControls')[this.disabledState(this.GeofenceChecked)]();
    this.SearchTypeGeofenceCheck[this.disabledState(this.RouteChecked || this.DepartureChecked)]();
    this.SearchTypeDepartCheck[this.disabledState(this.GeofenceChecked)]();
    this.SearchTypeRouteCheck[this.disabledState(this.GeofenceChecked)]();
  }
  /**
   * Set disabled state of formControls
   *
   * @param state value to test
   */
  protected disabledState(state: boolean): string {
    return state ? 'disable' : 'enable';
  }

  /**
   * Running a search using search buttons
   */
  public Search(): void {
    if (this.GeofenceChecked) {
    // this.startGeofenceDrawing();
    }

    if (this.DepartureChecked) {
      this.searchDepartureTable('DEPARTURE_TABLE');
    }

    if (this.RouteChecked) {
      this.SearchRoutes('ROUTES');
    }
  }

  /**
   * Clear search form
   */
  public ClearSearchForm(): void {
    if (this.GeofenceChecked) {
      this.clearGeofence();
    }

    if (this.DepartureChecked) {
      this.clearDepartureTable();
    }

    if (this.RouteChecked) {
      this.clearRoutes();
    }

    this.ResetSearchForm();
  }

  /**
   * Searching departure table
   *
   * @param searchType search type
   */
  protected searchDepartureTable(searchType: string): void {
   // const searching: boolean = this.isSearchingDepartTable = !this.isSearchingDepartTable;

    this.notificationService.UpdateDepartureTable(this.getFormValues(searchType), true);
  }

  /**
   * Clearing departure table
   */
  protected clearDepartureTable(): void {
    this.notificationService.UpdateDepartureTable(null, false);
  }

  // public ConditionVariableNameChanged(event: boolean): void {

  //   // if open event is false (closed)
  //   if (!event) {
  //     this.enableGeofenceSearch();
  //   }
  // }

  /**
   * Searching routes
   *
   * @param searchType search type
   */
  public SearchRoutes(searchType: string): void {
   // const searching: boolean = this.isSearchingRoute = !this.isSearchingRoute;
    // console.log('search type = ', searchType);
      this.notificationService.SearchRoute(this.getFormValues(searchType), true);
  }

  /**
   * Clear routes
   */
  protected clearRoutes(): void {
    this.notificationService.SearchRoute(null, false);
  }

  protected clearGeofence(): void {
    this.notificationService.StartGeofenceDrawing(null, false);
  }


  /**
   * Event handler to start/stop geofence drawing on the map
   */
  protected startGeofenceDrawing(): void {

    // check if we can search using geofence
    if (!this.canUseGeofence) { return; }

    const draw: boolean = this.IsDrawingGeofence = !this.IsDrawingGeofence;

    // enable / disable search form
    (draw) ?
    this.RouteInputForm.controls.SearchFormControls.disable() :
    this.RouteInputForm.controls.SearchFormControls.enable();

    // event for starting or clearing geofence drawing
    const searchData = this.getFormValues('GEOFENCE');
    this.notificationService.StartGeofenceDrawing(searchData, true);
  }

  /**
   * Toggle search and clear buttons
   */
  public DisableSearchButton(): boolean {

    if (this.GeofenceChecked) {
      // disable
      return true;
    }

    // disable
    if (!this.RouteInputForm.valid && !this.GeofenceChecked) { return true; }

    // enable
    if (this.RouteInputForm.valid && !this.GeofenceChecked) { return false; }
  }

  public DisableClearButton(): boolean {

    if (this.GeofenceChecked) { return false; }

    return this.DisableSearchButton();
  }

  /**
   * Set initial variable name selections
   */
  // protected initialSelectionOptions(): void {
  //   this.SelectAllOption.select();
  //   this.SelectAllHandler();
  // }

  /**
   * Select or deselect select all option
   */
  // public ToggleSelectionsHandler(evt: Event, name: string): void {

  //   if (this.SelectAllOption.selected) {
  //     this.SelectAllOption.deselect();
  //   }

  //   if (this.ConditionVariableNames.value.length === this.ConditionVariablesNameList.length) {
  //     this.SelectAllOption.select();
  //   }
  // }

  /**
   * Select all values
   */
  // public SelectAllHandler(evt?: Event, name?: string): void {

  //   if (this.SelectAllOption.selected) {
  //     // make a new copy of var names array
  //     const arr: Array<any> = [...this.ConditionVariablesNameList];
  //     // add select all option to the front of the variable names array
  //     arr.unshift(this.SelectAllObj);

  //     // update varNames value
  //      this.ConditionVariableNames.patchValue(arr);
  //   } else {
  //     this.ConditionVariableNames.patchValue([]);
  //   }
  // }

  /**
   * Get departure times
   */
  protected createDepartureTimes(): void {

    this.DepartureTimesList = [];

    /**
     * Create a list of date / times, starting with current date / time + 24 hours
     */
    for (let i: number = 0; i < 24; i++) {

      // milliseconds in an hour
      const msh: number = 60 * 60 * 1000;

      const d: Date = new Date();

      /**
       * Round to nearest hour
       */
        // get current minute and add 30
        d.setMinutes(d.getMinutes() + 30);
        // reset minutes, seconds, and milliseconds
        d.setMinutes(0, 0, 0);
      /**
       */

      // current date / time + one hour, convert as epoch
      const epoch: number = (d.getTime() + (i * msh));

      // display value
      const displayDate: string = this.displayDatePipe.transform(epoch);

      // actual value being sent to the API
      const unixTimeStamp: number = epoch / 1000;

      const dtm: DepartureTimeModel = new DepartureTimeModel();
      dtm.DisplayDate = displayDate;
      dtm.Epoch = unixTimeStamp;

      this.DepartureTimesList.push(dtm);
     //  this.DepartureTimesList.push(new DepartureTimeModel(displayDate, unixTimeStamp));
    }
   // this.DepartureTimes.setValue(this.DepartureTimesList);
   this.DepartureTimeConfig.Source = this.DepartureTimesList;
  }

  /**
   * Set default departure time
   */
  protected defaultDepartureTimes(): void {
    this.createDepartureTimes();
    this.DepartureTimes.setValue(this.DepartureTimesList[0]);
  }

   /**VALIDATIONS */

  /**
   * Validate whether or not we can run a geofence search
   */
  protected enableGeofenceSearch(): void {
    this.canUseGeofence = false;

    if (!this.RouteInputForm.controls.SearchConditions.valid) {
      // manually force validation, so we get notified of a validation error
      this.ConditionVariableNames.markAsTouched({onlySelf: true});
      return;
    }

    if (!this.RouteInputForm.controls.SearchConditions.valid || !this.GeofenceChecked) {
      return;
    }

    this.canUseGeofence = true;

    this.startGeofenceDrawing();
  }

  /**
   * Validate lat / long properties exist
   *
   * @param control form control to validate
   */
  protected validateOriginLatLong(control: AbstractControl): ValidationErrors {

    if (control.value && !control.value.position) {
      return { invalidOriginPosition:  true };
    }

  // no error
  return null;
  }

/**
   * Validate lat / long properties exist
   *
   * @param control form control to validate
   */
  protected validateDestinationLatLong(control: AbstractControl): ValidationErrors | null {

     if (control.value && !control.value.position) {
        return { invalidDestinationPosition:  true };
      }

    // no error
    return null;
  }


  /**RESET HELPERS*/

  /**
   * Reset search form back to defautls
   */
  public ResetSearchForm(): void {
    this.resetSearchTypes();
    this.RouteInputForm.reset();
    this.RouteInputForm.markAsPristine();
    this.RouteInputForm.markAsUntouched();

    this.RouteInputForm.controls.SearchTypeControls.reset();
    this.RouteInputForm.controls.SearchConditions.reset();

    this.defaultSelects();
  }

  /**
   * Reset search type checkboxes
   */
  protected resetSearchTypes(): void {
    this.RouteChecked = false;
    this.GeofenceChecked = false;
    this.DepartureChecked = false;

    this.enableSearchTypeCheckboxes();
  }

  /**
   * Set default select options
   */
  protected defaultSelects(): void {
    this.LoadDataSourceTypes();
   // this.initialSelectionOptions();
    this.defaultDepartureTimes();
  }

}

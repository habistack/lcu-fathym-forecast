
import { Component, Injector, OnDestroy, ViewChild } from '@angular/core';
import { IControlRender } from '@lcu/elements';
import {
  ForgeGenericControl,
  DataGridConfig,
  ColumnDefinition,
  DataGridPagination,
  PipeConstants,
  DataGridFeaturesModel,
  DataGridComponent
} from '@lcu/daf-ui';
import { ForgeDepartureTableDetails, ForgeDepartureTableConfig } from '../departure-table.core';
import {
  WeatherCloudConfigContext,
  WeatherCloudService,
  WeatherCloudSearchDepartureTableContext,
  WeatherCloudSearchModel,
  WeatherCloudSearchConstants,
  WeatherCloudConditionIcons,
  NotificationService
} from '@weather-cloud/common';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'forge-departure-table-render',
  templateUrl: './departure-table-render.component.html',
  styleUrls: ['./departure-table-render.component.scss']
})
export class ForgeDepartureTableRenderComponent extends ForgeGenericControl<ForgeDepartureTableDetails, ForgeDepartureTableConfig>
  implements OnDestroy, IControlRender<ForgeDepartureTableDetails, ForgeDepartureTableConfig> {
  //  Fields

  @ViewChild('Datagrid') dataGrid: DataGridComponent;

  /**
   * Parameters needed for the grid
  */
 protected _gridParameters: DataGridConfig;
 public set GridParameters(val: DataGridConfig) {
   this._gridParameters = val;
 }

 public get GridParameters(): DataGridConfig {
   return this. _gridParameters;
 }

 /**
 * Grid features, such as: Pagination, Filtering, Loader, etc.
 */
protected _gridFeatures: DataGridFeaturesModel;
public get GridFeatures(): DataGridFeaturesModel {
  return this._gridFeatures;
}

public set GridFeatures(val: DataGridFeaturesModel) {
  this._gridFeatures = val;
}
  /**
   * Token key for service call
   */
  protected apiKey: string = '';

   /**
   * Sets column names and order
   */
  protected columnDefs: Array<ColumnDefinition> = [];
  protected departureTableSubscription: Subscription;


  //  Properties
  public SearchModel: WeatherCloudSearchModel;

  //  Constructors
  constructor(
    protected injector: Injector,
    protected wcConfigContext: WeatherCloudConfigContext,
    protected wcService: WeatherCloudService,
    protected wcSearchDT: WeatherCloudSearchDepartureTableContext,
    protected notificationService: NotificationService
  ) {
    super(injector);
  }

  // Life Cycle
  public ngOnInit() {
    super.ngOnInit();

    this.setGridParameters();

    this.wcConfigContext.Context.subscribe(res => {

      if (!res) { return; }

        this.apiKey = res.APIKey;
       // this.setGridParameters();
       this.GridData();
    });

    this.departureTableSubscription = this.notificationService.DepartureTableChanged.subscribe(data => {
      if (!data) { return; }

      // if not searching, then clear the grid
      if (!data.IsSearching) {
        this.clearGrid();
        return;
      }

      this.Details.Origin = data.Origin;
      this.Details.Destination = data.Destination;
      this.Details.DepartureTime = data.DepartureTime;
      this.Details.IncludeAlts = data.IncludeAlts;

      // const newSearch = {...this.Details, ...search};

      this.SearchModel = data;
     // this.setGridParameters();
     this.GridData();
    });
    // this.wcSearchDT.Context.subscribe(search => {

    //   if (!search) { return; }

    //   this.Details.Origin = search.Origin;
    //   this.Details.Destination = search.Destination;
    //   this.Details.DepartureTime = search.DepartureTime;
    //   this.Details.IncludeAlts = search.IncludeAlts;

    //   // const newSearch = {...this.Details, ...search};

    //   this.SearchModel = search;
    //   this.setGridParameters();
    // });


  }

  public ngOnDestroy() {
    // should unsubscribe to subscription to avoid memory leaks
    if (this.departureTableSubscription) { this.departureTableSubscription.unsubscribe(); }

    this.GridParameters = this.defaultGridConfig();
  }
  // API Methods

  // Helpers
  protected controlChanged(): void {
    super.controlChanged();

    this.setGridParameters();

    // expose properties for grid here, held in details object
  }

  protected setGridParameters(): void {
      this.columnDefs = [
        new ColumnDefinition(
          'VtimesStart',
          '',
          true,
          false,
          false,
           PipeConstants.PIPE_EPOCH
           ),
        new ColumnDefinition(
          'TempMin',
          'Temp Min',
          true,
          true,
          false,
          PipeConstants.PIPE_TEMP_FAHRENHEIT,
          WeatherCloudConditionIcons
          ),
        new ColumnDefinition(
          'TempMax',
          'Temp Max',
          true,
          true,
          false,
          PipeConstants.PIPE_TEMP_FAHRENHEIT,
          WeatherCloudConditionIcons
          ),
        new ColumnDefinition(
          'PrecipMax',
          'Precipitation',
          false,
          true,
          false,
          null,
          WeatherCloudConditionIcons
        ),
        new ColumnDefinition(
          'WindSpdMax',
          'Wind Speed',
          true,
          true,
          false,
          PipeConstants.PIPE_MPH,
          WeatherCloudConditionIcons
          ),
        new ColumnDefinition(
          'WindGustMax',
          'Wind Gust',
          true,
          true,
          false,
          PipeConstants.PIPE_MPH,
          WeatherCloudConditionIcons
          )
      ];

      this.setGridFeatures();

      // showing grid column headers
    this.GridParameters = this.defaultGridConfig();
  }

  protected clearGrid(): void {
    this.defaultGridConfig();
    this.dataGrid.dataSource = new MatTableDataSource();
    this.notificationService.ClearForecastDetails();
  }

  /**
   * Setting up grid data, columns, and features
   */

   protected GridData(): void {
    if (this.SearchModel && this.apiKey) {

      const origin = this.Details.ReactToSearch ? this.SearchModel.Origin || this.Details.Origin : this.Details.Origin;

      const destination = this.Details.ReactToSearch
        ? this.SearchModel.Destination || this.Details.Destination
        : this.Details.Destination;

      const departTime = this.Details.ReactToSearch
        ? this.SearchModel.DepartureTime || this.Details.DepartureTime
        : this.Details.DepartureTime;

      const includeAlts = this.Details.IncludeAlts
      ? this.SearchModel.IncludeAlts || this.Details.IncludeAlts
      : this.Details.IncludeAlts;

      this.GridParameters = new DataGridConfig(
        this.wcService.GetDepartureTableData(this.apiKey, origin, destination, departTime, includeAlts),
        this.columnDefs,
        this.GridFeatures
      );
    }
   }

   /**
     * Setting up grid features
     */
    protected setGridFeatures(): void {
      const paginationDetails: DataGridPagination = new DataGridPagination();
      paginationDetails.PageSize = 10;
      paginationDetails.PageSizeOptions = [1, 5, 10, 20, 30];

      const features: DataGridFeaturesModel = new DataGridFeaturesModel();
     // features.Paginator = paginationDetails;
      features.Filter = false;
      features.ShowLoader = true;

      this.GridFeatures = features;
    }

    /**
     * Set just grid columns
     */
    protected defaultGridConfig(): DataGridConfig {
      return new DataGridConfig(null, this.columnDefs);
    }
}

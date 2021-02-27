import { Component, OnInit, Injector } from '@angular/core';
import {
  DataGridConfigModel,
  ColumnDefinitionModel,
  DataGridFeaturesModel,
} from '@lowcodeunit/data-grid';

import { FathymForecastConditionIcons } from '../../utils/weather-conditions-icons.utils';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'lcu-departure-table',
  templateUrl: './departure-table.component.html',
  styleUrls: ['./departure-table.component.css'],
})
export class DepartureTableComponent implements OnInit {
  /**
   * datagrid component
   */
  // @ViewChild('datagrid', {static: false}) dataGrid: DataGridComponent;

  /**
   * Parameters needed for the grid
   */
  protected _gridParameters: DataGridConfigModel;
  public set GridParameters(val: DataGridConfigModel) {
    this._gridParameters = val;
  }

  public get GridParameters(): DataGridConfigModel {
    return this._gridParameters;
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

  protected apiKey = 'fathym';
  /**
   * String for continuation
   */
  public Continuation: string;

  /**
   * List of devices
   */
  public Devices: Array<any>;

  /**
   * array for grid
   */
  // public GridItems: Array<DeviceGridModel>;

  protected columnDefs: Array<ColumnDefinitionModel> = [];

  constructor(protected ffService: DataService) {}

  ngOnInit() {
    this.setGridParameters();

    this.GridData();
  }

  protected setGridParameters(): void {
    // this.columnDefs = [
    //   new ColumnDefinitionModel(
    //     'VtimesStart', // columnType
    //     'Departure Time', // header title
    //     true, // show value
    //     false, // show icon
    //     false, // sortable
    //     PipeConstants.PIPE_EPOCH, // use pipe
    //     null, // icon function
    //     null // action
    //   ),
    //   new ColumnDefinitionModel(
    //     'TempMin',
    //     'Temp Min',
    //     true,
    //     true,
    //     false,
    //     null,
    //     null, // FathymForecastConditionIcons,
    //     null
    //   ),
    //   new ColumnDefinitionModel(
    //     'TempMax',
    //     'Temp Max',
    //     true,
    //     true,
    //     false,
    //     PipeConstants.PIPE_TEMP_FAHRENHEIT,
    //     null, // FathymForecastConditionIcons,
    //     null
    //   ),
    //   new ColumnDefinitionModel(
    //     'PrecipMax',
    //     'Precipitation',
    //     true,
    //     true,
    //     false,
    //     null,
    //     null, // FathymForecastConditionIcons,
    //     null
    //   ),
    //   new ColumnDefinitionModel(
    //     'WindSpdMax',
    //     'Wind Speed',
    //     true,
    //     true,
    //     false,
    //     PipeConstants.PIPE_MPH,
    //     null, // FathymForecastConditionIcons,
    //     null
    //   ),
    //   new ColumnDefinitionModel(
    //     'WindGustMax',
    //     'Wind Gust',
    //     true,
    //     true,
    //     false,
    //     PipeConstants.PIPE_MPH,
    //     null, // FathymForecastConditionIcons,
    //     null
    //   ),
    // ];

    this.setGridFeatures();

    // showing grid column headers
    this.GridParameters = this.defaultGridConfig();
  }

  public DoubleClick(): void {
    console.log('double');
  }

  /**
   * Setting up grid data, columns, and features
   */

  /**
   * Setting up grid features
   */
  protected setGridFeatures(): void {
    this.GridParameters = this.defaultGridConfig();
  }

  /**
   * Set just grid columns
   */
  protected defaultGridConfig(): DataGridConfigModel {
    return new DataGridConfigModel(null, this.columnDefs);
  }

  protected GridData(): void {
    const origin = '40.58897,-105.08246';
    const destination = '40.3978,-105.0750';
    const includeAlts = true;
    const departTime = '1566503558';

    // this.GridParameters = {
    //   ColumnDefs: this.ffService.GetDepartureTableData(
    //     this.apiKey,
    //     origin,
    //     destination,
    //     departTime,
    //     includeAlts
    //   ),
    //   ColumnDefs: this.columnDefs,
    //   Features: this.GridFeatures
    //   };
    console.log('grid params', this.GridParameters);
  }
}

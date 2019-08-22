import { Component, OnInit } from '@angular/core';
import { DataGridConfig, ColumnDefinition, DataGridFeatures } from '@lowcodeunit/data-grid';

@Component({
  selector: 'lcu-departure-table',
  templateUrl: './departure-table.component.html',
  styleUrls: ['./departure-table.component.css']
})
export class DepartureTableComponent implements OnInit {
/**
   * datagrid component
   */
 // @ViewChild('Datagrid', {static: false}) dataGrid: DataGridComponent;

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
 protected _gridFeatures: DataGridFeatures;
 public get GridFeatures(): DataGridFeatures {
   return this._gridFeatures;
 }
 
 public set GridFeatures(val: DataGridFeatures) {
   this._gridFeatures = val;
 }
 
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
   //public GridItems: Array<DeviceGridModel>;
 
   protected columnDefs: Array<ColumnDefinition> = [];
 
  constructor() { }

  ngOnInit() {

    this.setGridParameters();
  }
  protected setGridParameters(): void {
    this.columnDefs = [
      new ColumnDefinition(
        'VtimesStart',
        '',
        true,
        false,
        false,
        null,
        null,
        null
         ),
      new ColumnDefinition(
        'TempMin',
        'Temp Min',
        true,
        true,
        false,
        //PipeConstants.PIPE_TEMP_FAHRENHEIT,
        //WeatherCloudConditionIcons
        ),
      new ColumnDefinition(
        'TempMax',
        'Temp Max',
        true,
        true,
        false,
        //PipeConstants.PIPE_TEMP_FAHRENHEIT,
        //WeatherCloudConditionIcons
        ),
      new ColumnDefinition(
        'PrecipMax',
        'Precipitation',
        false,
        true,
        false,
        null,
        //WeatherCloudConditionIcons
      ),
      new ColumnDefinition(
        'WindSpdMax',
        'Wind Speed',
        true,
        true,
        false,
        //PipeConstants.PIPE_MPH,
        //WeatherCloudConditionIcons
        ),
      new ColumnDefinition(
        'WindGustMax',
        'Wind Gust',
        true,
        true,
        false,
        //PipeConstants.PIPE_MPH,
        //WeatherCloudConditionIcons
        )
    ];

    this.setGridFeatures();

    // showing grid column headers
  this.GridParameters = this.defaultGridConfig();
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
  protected defaultGridConfig(): DataGridConfig {
    return new DataGridConfig(null, this.columnDefs);
  }
}

import { Component, OnInit, Injector } from '@angular/core';
import { DataGridConfig, ColumnDefinition, DataGridFeatures, PipeConstants } from '@lowcodeunit/data-grid';
import { WeatherCloudService } from '../services/departure-table.service';
import { WeatherCloudConditionIcons } from '../utils/weather-conditions-icons.utils'

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
 
  protected apiKey: string = 'fathym';
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
 
  constructor(
    protected wcService: WeatherCloudService,
  ) {}

  ngOnInit() {


    this.setGridParameters();

    this.GridData();
  }

  protected setGridParameters(): void {
    this.columnDefs = [
      new ColumnDefinition(
        'VtimesStart', //columnType
        'Departure Time', //header title
        true, // show value
        false, // show icon
        false, // sortable
        PipeConstants.PIPE_EPOCH, // use pipe
        null, // icon function
        null // action
         ),
      new ColumnDefinition(
        'TempMin',
        'Temp Min',
        true,
        true,
        false,
        PipeConstants.PIPE_TEMP_FAHRENHEIT,
        null, //WeatherCloudConditionIcons,
        null
        ),
      new ColumnDefinition(
        'TempMax',
        'Temp Max',
        true,
        true,
        false,
        PipeConstants.PIPE_TEMP_FAHRENHEIT,
        null, //WeatherCloudConditionIcons,
        null
        ),
      new ColumnDefinition(
        'PrecipMax',
        'Precipitation',
        true,
        true,
        false,
        null,
        null, //WeatherCloudConditionIcons,
        null
      ),
      new ColumnDefinition(
        'WindSpdMax',
        'Wind Speed',
        true,
        true,
        false,
        PipeConstants.PIPE_MPH,
        null, //WeatherCloudConditionIcons,
        null
        ),
      new ColumnDefinition(
        'WindGustMax',
        'Wind Gust',
        true,
        true,
        false,
        PipeConstants.PIPE_MPH,
        null, //WeatherCloudConditionIcons,
        null
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

  protected GridData(): void {
    const origin = "40.58897,-105.08246";
    const destination = "40.3978,-105.0750";
    const includeAlts = true;
    const departTime = "1566503558";

      this.GridParameters = new DataGridConfig(
        this.wcService.GetDepartureTableData(this.apiKey, origin, destination, departTime, includeAlts),
        this.columnDefs,
        this.GridFeatures
      );
  }
}

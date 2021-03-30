import { Component, OnInit, Injector } from '@angular/core';
import { DataGridConfigModel, ColumnDefinitionModel, DataGridFeaturesModel } from '@lowcodeunit/data-grid';
import { DataPipeConstants } from '@lcu/common';

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
   // public GridItems: Array<DeviceGridModel>;

   protected columnDefs: Array<ColumnDefinitionModel> = [];

  constructor(
    protected ffService: DataService,
  ) {}

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

//   new ColumnDefinitionModel({
//     ColType: 'copy',
//     ColWidth: '10px',
//     Title: '',
//     ShowValue: false,
//     ShowIcon: true,
//     IconColor: 'orange-accent-text',
//     IconConfigFunc: (keyData) => {
//         return keyData.$IsCopySuccessIcon ? 'done' : 'content_copy';
//     },
//     Action: {
//         ActionHandler: this.CopyClick.bind(this),
//         ActionType: 'button',
//         ActionTooltip: 'Copy SAS Token',
//     },
// })

  protected setGridParameters(): void {
    this.columnDefs = [
      new ColumnDefinitionModel({
        ColType: 'VtimesStart', // columnType
        Title: 'Departure Time', // header title
        ShowValue: true, // show value
        ShowIcon: false, // show icon
        Sortable: false, // sortable
        Pipe: DataPipeConstants.PIPE_EPOCH, // use pipe
      }),
      new ColumnDefinitionModel({
        ColType: 'TempMin',
        Title: 'Temp Min',
        ShowValue: true,
        ShowIcon: true,
        Sortable: false,
      }),
      new ColumnDefinitionModel({
        ColType: 'TempMax',
        Title: 'Temp Max',
        ShowValue: true,
        ShowIcon: true,
        Sortable: false,
        Pipe: DataPipeConstants.PIPE_TEMP_FAHRENHEIT,
      }),
      new ColumnDefinitionModel({
        ColType: 'PrecipMax',
        Title: 'Precipitation',
        ShowValue: true,
        ShowIcon: true,
        Sortable: false,
      }),
      new ColumnDefinitionModel({
        ColType: 'WindSpdMax',
        Title: 'Wind Speed',
        ShowValue: true,
        ShowIcon: true,
        Sortable: false,
        Pipe: DataPipeConstants.PIPE_MPH
      }),
      new ColumnDefinitionModel({
        ColType: 'WindGustMax',
        Title: 'Wind Gust',
        ShowValue: true,
        ShowIcon: true,
        Sortable: false,
        Pipe: DataPipeConstants.PIPE_MPH,
      })
    ];

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

    this.GridParameters = new DataGridConfigModel(
        this.ffService.GetDepartureTableData(this.apiKey, origin, destination, departTime, includeAlts),
        this.columnDefs,
        this.GridFeatures
      );
      console.log("grid params", this.GridParameters)
  }
}

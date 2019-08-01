// @dynamic

/**
 * @dynamic is used because this class contains static properties
 */

export class WeatherCloudSearchConstants {
  /**
   * Primary button label
   */
  public static readonly BUTTON_PRIMARY: string = 'primary';

  /**
   * Warning button label
   */
  public static readonly BUTTON_WARN: string = 'warn';

  /**
   * Clear form button label
   */
  public static readonly CLEAR_FORM: string = 'Clear Form';

  /**
   * Clear departure table button label
   */
  public static readonly CLEAR_DEPARTURE_TABLE: string = 'Clear Departure Table';

  /**
   * Clear geofence button label
   */
  public static readonly CLEAR_POLYGON_DRAWING: string = 'Clear Geofence Drawing';

  /**
   * Clear routes button label
   */
  public static readonly CLEAR_ROUTES: string = 'Clear Route(s)';

  /**
   * Forecast model HRRR
   */
  public static readonly FORECAST_MODEL_HRRR: string = 'HRRR';

  /**
   * Forecast model GFS
   */
  public static readonly FORECAST_MODEL_GFS: string = 'GFS';

  /**
   * Forecast model Blend
   */
  public static readonly FORECAST_MODEL_BLEND: string = 'Fathym Ground Truth Forecast';

  /**
   * Forecast model MWAVE
   */
  public static readonly FORECAST_MODEL_MWAVE: string = 'MWAVE';

  /**
   * Show departure table button label
   */
  public static readonly SHOW_DEPARTURE_TABLE: string = 'Show Departure Table';

  /**
   * Show routes button label
   */
  public static readonly SHOW_ROUTES: string = 'Show Route(s)';

  /**
   * Start geofence button label
   */
  public static readonly START_POLYGON_DRAWING: string = 'Start Geofence Drawing';

  public static readonly VAR_NAMES_SELECT: Array<object> = [
                                                  {key: 'Temperature', value: 't'},
                                                  {key: 'Surface Temp', value: 'sfc_t'},
                                                  {key: 'Precipitation', value: 'prate'},
                                                  {key: 'Precipitation Type', value: 'ptype'},
                                                  {key: 'Wind Speed', value: 'wspd'},
                                                  {key: 'Wind Gust', value: 'gust'},
                                                  {key: 'Wind Direction', value: 'wdir'},
                                                  {key: 'Cloud Cover', value: 'cloudcover'},
                                                  {key: 'Radiation', value: 'rad'},
                                                  {key: 'Visibility', value: 'vis'},
                                                  {key: 'Elevation', value: 'hgt'},
                                                  {key: 'Snow Depth', value: 'snod'}];

  public static readonly FORECAST_DISPLAY_DATE_FORMAT: string = 'EEE h aa'; // Fri 9 AM

  public static readonly CONDITION_CONFIG = {
    'MultiSelect': {
      'DefaultSelectAll': true,
      'Enable': true,
      'SelectAll': true
    },
    'DisplayProperty': 'Key',
    'Source':
      [
        {Key: 'Temperature', Value: 't'},
        {Key: 'Surface Temp', Value: 'sfc_t'},
        {Key: 'Precipitation', Value: 'prate'},
        {Key: 'Precipitation Type', Value: 'ptype'},
        {Key: 'Wind Speed', Value: 'wspd'},
        {Key: 'Wind Gust', Value: 'gust'},
        {Key: 'Wind Direction', Value: 'wdir'},
        {Key: 'Cloud Cover', Value: 'cloudcover'},
        {Key: 'Radiation', Value: 'rad'},
        {Key: 'Visibility', Value: 'vis'},
        {Key: 'Elevation', Value: 'hgt'},
        {Key: 'Snow Depth', Value: 'snod'}]

  };

  public static readonly DEPARTURE_TIMES_CONFIG = {
    'MultiSelect': {
      'DefaultSelectAll': false,
      'Enable': false,
      'SelectAll': false
    },
    'DisplayProperty': 'DisplayDate',
    'Source': []

  };

  public static readonly FORECAST_MODEL_CONFIG = {
    'MultiSelect': {
      'DefaultSelectAll': false,
      'Enable': false,
      'SelectAll': false
    },
    'DisplayProperty': 'Name',
    'Source': []

  };
}


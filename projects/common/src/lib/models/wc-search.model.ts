import { WCDatasourceTypesModel } from './wc-datasource-types.model';
export class WeatherCloudSearchModel {
  public DepartureTime: string;

  public Destination: string;

  public IncludeAlts: boolean;

  public IsSearching: boolean;

  public Origin: string;

  public SearchType: string;

  public SearchDatasourceType: WCDatasourceTypesModel;

  constructor(
              origin: string,
              destination: string,
              departTime: string,
              includeAlts: boolean,
              searchType: string,
              searchDatasourceType: WCDatasourceTypesModel) {
    this.DepartureTime = departTime;
    this.Destination = destination;
    this.IncludeAlts = includeAlts;
    this.Origin = origin;
    this.SearchType = searchType;
    this.SearchDatasourceType = searchDatasourceType;
  }
}

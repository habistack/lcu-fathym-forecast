
export class DatasourceTypesModel {
  public FcstCfg: string;
  public Host: string;
  public Name: string;
  public URLPrefix: string;
  public VarNames: string;

  /**
   * Datasource types for search results
   *
   * @param FcstCfg configuration type
   *
   * @param Host url domain
   *
   * @param Name datasoure type
   *
   * @param URLPrefix type of route to search
   *
   * @param VarNames properties to return
   *
   */

  constructor(fcstCfg: string, host: string, name: string, urlPrefix: string, varNames: string) {
    this.FcstCfg = fcstCfg;
    this.Host = host;
    this.Name = name;
    this.URLPrefix = urlPrefix;
    this.VarNames = varNames;
  }
}



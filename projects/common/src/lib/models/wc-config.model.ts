export class WeatherCloudConfig {
  public APIKey: string;

  public LBSKey: string;

 // public ServerURL?: string = 'https://wxlb01.fathym.com/route';
  public ServerURL?: string = 'http://fathymwx.westus.cloudapp.azure.com/blend/routefcst';
  // public ServerURL?: string = 'https://azuremaps.fathym.com/route';
  // public ServerURL?: string = 'https://cors.io/?http://wxcloud-hrrr.westus.cloudapp.azure.com';

  public ForecastImageDateFormat?: string = 'yyyyMMdd.HHmm';

  public ForecastDisplayDateFormat?: string = 'EEE h aa'; // Fri 9 AM


  public ForcastConfiguration?: string = 'hrrr_config';

  // public VariableNames?: string = 't,sfc_t,prate,ptype,wspd,gust,cloudcover,rad,vis,rt,primary_roadstate,elev';
}

import { Injectable } from '@angular/core';
import { BaseConfigContext, SingletonService } from '@lcu/enterprises';
import { WeatherCloudConfig } from '../models/wc-config.model';

  @Injectable({
  providedIn: 'root'
  })
  export class WeatherCloudConfigContext extends BaseConfigContext<WeatherCloudConfig> {
  // Fields

  // Properties

  // Constructors
  constructor(protected configSvc: SingletonService) {
    super(configSvc);
  }

  // API Methods

  // Helpers
  protected loadConfigKey() {
    return `WeatherCloudConfig`;
  }

  protected loadDefaultConfig(): WeatherCloudConfig {
    return {
      APIKey: '',
      LBSKey: '',
      ServerURL: '',
     //  VariableNames: ''
    };
  }
}

import { Injectable } from '@angular/core';
import { BaseConfigContext, SingletonService } from '@lcu/enterprises';
import { WeatherCloudConfig } from '../models/wc-config.model';
import { WeatherCloudConfigContext } from './wc-config.context';
import { of, Observable } from 'rxjs';
import { Status } from '@lcu/common';

@Injectable({
	providedIn: 'root'
})
export class WeatherCloudNativeConfigContext extends WeatherCloudConfigContext {
	//	Fields

	//	Properties

	//	Constructors
	constructor(protected wcConfig: WeatherCloudConfig) {
		super(null);
	}

  //	API Methods
  public Load(): Observable<Status> {
    return Observable.create((obs) => {
      this.subject.next(this.wcConfig);

      obs.resolve(<Status>{Code: 0, Message: 'Success'});

      obs.complete();
    });
  }

  //	Helpers

	protected loadDefaultConfig(): WeatherCloudConfig {
		return this.wcConfig;
	}
}


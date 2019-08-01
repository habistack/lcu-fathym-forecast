import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseModeledResponse, BaseResponse } from '@lcu/core';
import { DAFService } from '@lcu/api';
import { WeatherCloudConfig } from '../models/wc-config.model';

@Injectable({
	providedIn: 'root'
})
export class WeatherCloudConfigService extends DAFService {
	//	Fields
	protected rootUrl: string = '/forge-api/weathercloud';

	// Constructors
	constructor(protected injector: Injector) {
		super(injector);
	}

	//	API Methods
	public Get(): Observable<BaseModeledResponse<WeatherCloudConfig>> {
		return this.get(`${this.rootUrl}`);
  }

	public Save(config: WeatherCloudConfig): Observable<BaseResponse> {
		return this.post(config, `${this.rootUrl}`);
	}
}

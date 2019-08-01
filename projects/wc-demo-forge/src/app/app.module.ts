import { NgModule } from '@angular/core';

import { CoreModule } from './core.module';
import { WeatherCloudCommonModule } from '@weather-cloud/common';
import { ForgeWcSearchFormDisplayModule } from '@weather-cloud/lcu-el-wc-search-form';

// "@weather-cloud/lcu-sln-weather-cloud": "^0.1.1402-departure-time",

@NgModule({
	declarations: [
	],
	imports: [
    CoreModule,
    WeatherCloudCommonModule,
    ForgeWcSearchFormDisplayModule
	],
	providers: [],
	bootstrap: [CoreModule.LoadBootstrap()],
})
export class AppModule { }

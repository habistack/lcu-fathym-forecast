import { WeatherCloudService } from './services/weather-cloud.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ImageDateFormatPipe, DisplayDateFormatPipe } from './utils/pipes/wc-pipes';
import { WeatherCloudConfigService } from './services/weather-cloud-config.service';
import { ToastrModule } from 'ngx-toastr';

const entryComps = [];

const comps = [...entryComps, DisplayDateFormatPipe, ImageDateFormatPipe];

@NgModule({
  declarations: [...comps],
  imports: [CommonModule, ToastrModule.forRoot()],
  exports: [...comps],
  entryComponents: [...entryComps]
})
export class WeatherCloudCommonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: WeatherCloudCommonModule,
      providers: [WeatherCloudConfigService, WeatherCloudService, DisplayDateFormatPipe, ImageDateFormatPipe]
    };
  }
}

import { WeatherCloudSearchConstants } from './../constants/wc-search.constants';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';



@Pipe({
  name: 'displayDateFormat'
})
export class DisplayDateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, WeatherCloudSearchConstants.FORECAST_DISPLAY_DATE_FORMAT);
  }
}

@Pipe({
  name: 'imageDateFormat'
})
export class ImageDateFormatPipe extends DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
      return super.transform(value, args[0], 'UTC');
    }
}

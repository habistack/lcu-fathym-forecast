import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SearchConstants } from '../../constants/search.constants';



@Pipe({
  name: 'displayDateFormat'
})
export class DisplayDateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, SearchConstants.FORECAST_DISPLAY_DATE_FORMAT);
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

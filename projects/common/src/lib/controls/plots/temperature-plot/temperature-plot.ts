import { Plot } from '../plots';

export class TemperaturePlot extends Plot {

    protected unitType: string = '';

    constructor(public units: string, public subTitle: string) {
      super('Temperature', {
          t: {
            title: 'Air Temp',
            color: '#0000dd'
          },
          sfc_t: {
            title: 'Surface Temp',
            color: '#dd00b4'
          },
          road_temp: {
            title: 'Road Surface Temp',
            color: '#222222'
          }/*,dewpt:{
            title:'Dew Point Temperature',
            color:'#006400'
          }*/}, units, subTitle);

          this.unitType = units;
        }

        /**
         * Set chart background color, based off current value
         *
         * @param val temperature value
         */
        getColor(val: number) {
          val = val['Air Temp'] || val['Surface Temp'] || val['Road Surface Temp'];

          if (val === null) { return '#0000dd'; }

          if (this.unitType.toUpperCase() === 'F') {
            this.fahrenheit(val);
          } else if (this.unitType.toUpperCase() === 'C') {
            this.celsius(val);
          }

          return '#ffff00';
        }

        protected fahrenheit(val: number): string {
          if (val <= 32) { return '#0059d6'; }
          if (val > 32 && val <= 85) { return '#00dd00'; }
          if (val > 85 && val <= 95) { return '#ffff00'; }
          if (val > 95) { return '#ff0000'; }
        }

        protected celsius(val: number): string {
          if (val <= 0) { return '#0059d6'; }
          if (val > 0 && val <= 29) { return '#00dd00'; }
          if (val > 29 && val <= 35) { return '#ffff00'; }
          if (val > 35) { return '#ff0000'; }
        }
}

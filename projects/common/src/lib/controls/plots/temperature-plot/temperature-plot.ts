import { Plot } from '../plots';

export class TemperaturePlot extends Plot {

  protected unitType: string = '';

  constructor(public units: string, public subTitle: string) {
    super('Temperature', {
      /*
      t: {
        title: 'Air Temp',
        color: '#0000dd'
      },
      */
      surfaceTemperature: {
        title: 'Air Temp',
        color: '#dd00b4'
      },
      roadTemperature: {
        title: 'Road Surface Temp',
        color: '#222222'
      }
      /*,dewpt: {
        title:'Dew Point Temperature',
        color:'#006400'
      }
      */
    }, units, subTitle);

    this.unitType = units;
  }

  /**
   * Set chart background color, based off current value
   *
   * @param val temperature value
   */
  getColor(val: number) {
    val = val['Air Temp'] || val['Road Surface Temp'];

    if (val === null) { return '#0000dd'; }

    if (this.unitType.toUpperCase() === 'F') {
      return this.fahrenheit(val);
    } else if (this.unitType.toUpperCase() === 'C') {
      return this.celsius(val);
    } else if (this.unitType.toUpperCase() === 'K') {
      return this.fahrenheit(val);
    }

    // return '#ffff00';
  }

  getForceY() {
    return [0.0, 150];
  }
  /**
   * Formats the y-axis and tool tip
   */
  getTickFormat(v: number){
    if (!v) { return; }
    let temp = Math.round(v);
    if(v) {return temp + ' \u00B0'}
  }

  /**
   * set colors based of fahrenheit
   *
   * @param val fahrenheit value
   */
  protected fahrenheit(val: number): string {
    if (val <= 32) { return '#0059d6'; }
    if (val > 32 && val <= 85) { return '#00dd00'; }
    if (val > 85 && val <= 95) { return '#ffff00'; }
    if (val > 95) { return '#ff0000'; }
  }

  /**
   * set colors based of celsius
   *
   * @param val celsius value
   */
  protected celsius(val: number): string {
    if (val <= 0) { return '#0059d6'; }
    if (val > 0 && val <= 29) { return '#00dd00'; }
    if (val > 29 && val <= 35) { return '#ffff00'; }
    if (val > 35) { return '#ff0000'; }
  }
}

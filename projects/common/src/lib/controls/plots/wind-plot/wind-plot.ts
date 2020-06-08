import { Plot } from '../plots';

export class WindPlot extends Plot {

	protected unitDisplay: string;
	protected defaultUnitDisplay: string = 'm/s';

    constructor(public units: string, subTitle: string, unitOverride?: string) {
      super('Wind Speed', {
          windSpeed: {
        title: 'Wind Speed',
        color: '#222222'
          },
          gust: {
        title: 'Gust',
        color: '#0000dd'
          }}, units, subTitle);
		this.unitDisplay = unitOverride ? unitOverride : this.defaultUnitDisplay;
        }

      /**
         * Set chart background color, based off current value
         *
         * @param val wind speed / gust value
         */
        getColor(v: number) {

          const windSpeed: number = v['Wind Speed'] || null;
          const windGust: number = v['Gust'] || null;

          if (windSpeed && windGust) {
            return this.greaterThan(windSpeed, windGust);
          } else if (windSpeed && !windGust) {
            return this.windSpeed(windSpeed);
          } else if (windGust && ! windSpeed) {
            return this.windGust(windGust);
          }

          return '#fff';
        }

        getForceY() {
        return [0.0, 35];//5
      }
      /**
   * Formats the y-axis and tool tip
   */
  getTickFormat(v: number){
		if (!v) { return `0.00 ${this.unitDisplay}`; }
    let speed = Math.round(v);
		if (v) { return speed + ` ${this.unitDisplay}` }
  }

      /**
       * Check whether wind speed or gust is greater, then return color
       *
       * @param windSpd wind speed
       * @param windGust wind gust speed
       */
      protected greaterThan(windSpd: number, windGust: number): string {
        const num: number = Math.max(windSpd, windGust);

        const none: boolean = num === 0;
        const low: boolean = num <= 23;
        const warn: boolean = num > 23 && num <= 33;
        const alert: boolean = num > 33;

        if (none) { return '#fff'; }
        if (low) { return '#00d300'; }
        if (warn) { return '#ffff00'; }
        if (alert) { return '#ff0000'; }
      }

      protected windSpeed(windSpdMax: number): string {
        // console.log("wind speed = ", windSpdMax)
        const none: boolean = windSpdMax === 0;
        const low: boolean = windSpdMax <= 16;
        const warn: boolean = windSpdMax > 16 && windSpdMax <= 27;
        const alert: boolean = windSpdMax > 27;

        if (none) { return '#fff'; }
        if (low) { return '#00d300'; }
        if (warn) { return '#ffff00'; }
        if (alert) { return '#ff0000'; }
      }

      protected windGust(windGustMax: number): string {
        const none: boolean = windGustMax === 0;
        const low: boolean = windGustMax <= 23;
        const warn: boolean = windGustMax > 23 && windGustMax <= 33;
        const alert: boolean = windGustMax > 33;

        if (none) { return '#fff'; }
        if (low) { return '#00d300'; }
        if (warn) { return '#ffff00'; }
        if (alert) { return '#ff0000'; }
      }

}

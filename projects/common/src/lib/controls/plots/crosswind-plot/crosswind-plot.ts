import { Plot } from '../plots';

export class CrosswindPlot extends Plot {
    constructor(public units: string, subTitle?: string) {
  super('Crosswind Risk', {
            crosswindRisk: {
                title: 'Crosswind Risk Forecast',
                color: '#222222'
            }
        }, units, subTitle);
    }

    /**
     * Set chart background color, based off current value
     *
     * @param val crosswind value
     */
    getColor(val: number) {
        val = val['Crosswind Risk Forecast'];
        // console.log("crosswind val = ", val)
        if (val === null) { return '#d8d8d8'; }
        if (val >= 0 && val < 1) { return '#00dd00'; } //green
        if (val >= 1 && val <2){ return '#ffff00'; } //yellow
        if (val >= 2) { return '#ff0000'; } //red

        return '#ffff00';
    }

    getForceY() {
      return [0.0, 2];
    }

    /**
     * Assign yAxis label (left side of chart), based off current value
     *
     * @param val crosswind value
     */
    getTickFormat(val: number) {

        if (val >= 0 && val < 1) { return 'Low'; }
        if (val >= 1 && val < 2) { return 'Medium'; }
        if (val >= 2) { return 'High'; }

    }
}

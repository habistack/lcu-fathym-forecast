import { Plot } from '../plots';

export class PotentialDelayRiskPlot extends Plot {
    constructor(public units: string, public subTitle: string) {
      super('Potential Delay Risk', {
        routeDelayRisk: {
                title: 'Potential Delay Risk',
                color: '#0003dd'
            }
        }, units, subTitle);


    }

    getColor(val: number) {
        val = val['Potential Delay Risk'];

        // if (val === null) { return '#d8d8d8'; }
        if (val >=0 && val < 1) { return '#00dd00'; }
        if (val >= 1 && val < 2) { return '#bffc05'; }
        if (val >= 2 && val < 3) { return '#ffff00'; }
        if (val >= 3 && val < 4) { return '#fcb205'; }
        if (val >= 4) { return '#ff0000'; }

        return '#ffff00';
    }

    getForceY() {
       return [0.0, 4];
    }

    getTickCount() {
        // console.log('val=', val);
        return 4;
    }

    /**
     * Assign yAxis label (left side of chart), based off road state value
     *
     * @param val delay risk value
     */
    getTickFormat(v: number) {
        // return v.toString();
        if (!v) { return 'Normal'; }
        if (v >=0 && v < 1) { return 'Normal'; }
        if (v >= 1 && v < 2) { return 'Slight'; }
        if (v >= 2 && v < 3) { return 'Moderate'; }
        if (v >= 3 && v < 4) { return 'Heavy'; }
        if (v >= 4 && v < 5) { return 'Severe'; }
        if(v >= 5) {return 'Extreme'}
    }
}

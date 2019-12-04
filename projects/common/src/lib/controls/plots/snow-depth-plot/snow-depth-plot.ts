import { Plot } from '../plots';

export class SnowDepthPlot extends Plot {
    constructor(public units: string, public subTitle: string) {
      super('Snow Depth', {
      snowDepth: {
      title: 'Snow Depth',
      color: '#000000'
    },
    d_snod: {
      title: 'Cumulative',
      color: '#222222'
    }
  }, units, subTitle);
    }

    /**
     * Set chart background color, based off current value
     *
     * @param val snow depth value
     */
    getColor(val: number) {
      val = val['Snow Depth'];

      if (val === null) { return '#d8d8d8'; }
      if (val < 2) { return '#00dd00'; }
      if (val >= 2 && val<= 4) { return '#b760b7'; }
      if (val >=4) { return '#0000dd'; }

      return '#ffffff';
    }

    getTickFormat(v: number){
      if (!v) { return '0.00 mm'; }
      let depth = v.toFixed(2);
      if(v) {return depth + ' mm'}
    }

    getForceY() {
      return [0.0, 5];
    }
}

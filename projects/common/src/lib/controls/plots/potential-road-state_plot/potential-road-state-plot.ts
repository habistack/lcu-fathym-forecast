import { Plot } from '../plots';

export class PotentialRoadStatePlot extends Plot {
    constructor(public units: string, public subTitle: string) {
      super('Potential Road State', {
            roadState: {
                title: 'Potential Road State',
                color: '#0003dd'
            }
        }, units, subTitle);
    }

    getColor(val: number) {
        val = val['Potential Road State']

        if (val === null) { return '#d8d8d8'; } //grey
        if (val === 0) { return '#ffffff'; } //white
        if (val === 1) { return '#00dd00'; }//lime
        if (val === 2) { return '	#669866'; } //blue
        if (val === 3) { return '#b760b7'; }//purple
        if (val === 4) { return '#851A8E'; } //dark purple
        if (val === 5) { return '#9F45A5'; }//light purple
        if (val === 6) { return '#ff00ff'; }// dark purple
        if (val === 7) { return '#80044B'; }//dark redish purple
        if (val === 8) { return '#008888'; } //dark teal


        return '#ffff00';
    }

    getForceY() {
      return [0.0, 5];
    }

    /**
     * Assign yAxis label (left side of chart), based off road state value
     *
     * @param val road state value
     * 
     * 
     */
    getTickFormat(val: number) {

        if (val === 0) { return 'Dry'; }
        if (val === 1) { return 'Wet'; }
        if (val === 2) { return 'Freezing Rain'; }
        if (val === 3) { return 'Snow'; }
        if (val === 4) { return "Snow and Ice"; }
        if (val === 5) { return "Freezing Rain and Ice"; }
        if (val === 6) { return "Ice"; }
        if (val === 7) { return "Hail and Ice"; }
        if (val === 8) { return "Hail"; }
    }

    getTickCount(){
        return 2;
    }
}

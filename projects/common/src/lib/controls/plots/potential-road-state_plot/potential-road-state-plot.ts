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
        if (val === 0) { return '#ffffff'; } //white dry
        if (val === 1) { return '#00dd00'; }//lime wet 
        if (val === 2) { return '#669866'; } //puke green freezing rain
        if (val === 3) { return '#b760b7'; }//purple snow
        if (val === 4) { return '#8C338F'; } //dark purple snow and ice
        if (val === 5) { return '#9F45A5'; }//light purple freezing rain and ice
        if (val === 6) { return '#6F0475'; }// dark purple ice
        if (val === 7) { return '#80044B'; }//dark redish purple hail and ice
        if (val === 8) { return '#008888'; } //red hail


        return '#ffff00';
    }

    getForceY() {
      return [0.0,8];
    //   return ["Dry", "Wet", "Snow", "Ice", "Hail"]
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

    // getTickCount(){
    //     return 2;
    // }
}

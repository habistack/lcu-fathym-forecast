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

    getColor(val: string) {
        val = val['Potential Road State']

        if (val === null) { return '#d8d8d8'; } //grey
        if (val === "Dry") { return '#ffffff'; } //white
        if (val === "Wet") { return '#00dd00'; }//lime
        if (val === "Freezing Rain") { return '	#669866'; } //blue
        if (val === "Snow") { return '#b760b7'; }//purple
        if (val === "Snow and Ice") { return '#851A8E'; } //dark purple
        if (val === "Freezing Rain and Ice") { return '#9F45A5'; }//light purple
        if (val === "Ice") { return '#ff00ff'; }// dark purple
        if (val === "Hail and Ice") { return '#80044B'; }//dark redish purple
        if (val === "Hail") { return '#008888'; } //dark teal


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
    getTickFormat(val: string) {

        if (val === "Dry") { return 'Dry'; }
        if (val === "Wet") { return 'Wet'; }
        if (val === "Snow") { return 'Snow'; }
        if (val === "Freezing Rain") { return 'Freezing Rain'; }
        if (val === "Ice") { return "Ice"; }
        if (val === "Hail") { return "Hail"; }
        if (val === "Snow and Ice") { return "Snow and Ice"; }
        if (val === "Freezing Rain and Ice") { return "Freezing Rain and Ice"; }
        if (val === "Hail and Ice") { return "Hail and Ice"; }
    }

    getTickCount(){
        return 9;
    }
}

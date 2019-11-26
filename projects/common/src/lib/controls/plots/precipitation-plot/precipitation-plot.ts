import { Plot } from '../plots';

export class PrecipitationPlot extends Plot {
    constructor(public units:string, public subTitle: string) {
	super('Precipitation', {
	    precipitationRate: {
			title: 'Precipitation Rate',
			color: '#0000dd'
		},
		roadState: {
			title: 'ptype'
	    }}, units, subTitle);
    }
    getForceY() {
	    return [0.0, 1.0];
    }

    getColor(v: number) {
		const ptype = v['ptype'];
		const precip = v['Precipitation Rate'];

		if (precip === null) {
			return '#d8d8d8';
		}

		if (ptype === 0) {
			return '#ffffff';
		} else if (ptype === 1) {
			if (precip > 0 && precip < 0.5) {
			return '#00dd00';
			} else if (precip >= 0.5 && precip < 0.75) {
			return '#ffff00';
			} else if (precip >= 0.75) {
			return '#ff0000';
			}
		} else if (ptype === 2) {
			return '#b760b7';
		} else if (ptype >= 3) {
			return '#0000dd';
		}
		return '#888888';
	}

	getTickCount() {
        return 4;
    }

	getTickFormat(v: number){
		if (!v) { return; }
		if(v <= 0) {return "None"}
        if (v > 0 && v <= .5 ) { return 'Light'; }
        if (v > 0.5 && v<=1 ) { return 'Moderate'; }
        if (v > 1) { return 'Heavy'; }
	}

}

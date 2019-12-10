import { Plot } from '../plots';

export class PrecipitationPlot extends Plot {

	protected unitDisplay: string;
	protected defaultUnitDisplay: string = 'mm/hr';

	constructor(public units: string, public subTitle: string, unitOverride?: string) {
		super('Precipitation', {
			precipitationRate: {
				title: 'Precipitation Rate',
				color: '#000000'
			},
			roadState: {
				title: 'ptype'
			}
		}, units, subTitle);
		this.unitDisplay = unitOverride ? unitOverride : this.defaultUnitDisplay;
	}
	getForceY() {
		return [0.0, 2.0];
	}

	getColor(v: number) {
		const ptype = v['ptype'];
		const precip = v['Precipitation Rate'];

		if (precip === null || !precip) {
			return '#d8d8d8';//grey
		}

		if (ptype === 0) {
			return '#ffffff'; //white
		} else if (ptype === 1 || ptype === 2) { //rain or freezing rain
			if (precip > 0 && precip < 0.5) {
				return '#00dd00';//green
			} else if (precip >= 0.5 && precip < 0.75) {
				return '#ffff00'; //yellow
			} else if (precip >= 0.75) {
				return '#ff0000'; //red
			}
		} else if (ptype >= 3 && ptype <= 6) {
			if (precip > 0 && precip < 0.5) {
				return '#d68dd6';//light purple
			} else if (precip >= 0.5 && precip < 0.75) {
				return '#873b87'; //reg purple
			} else if (precip >= 0.75) {
				return '#700470'; //dark purple
			}
		} else if (ptype >= 7) {
			return '#800a01';//dark red
		}
		// return '#888888';
	}

	// getTickCount() {
	//     return 3;
	// }

	getTickFormat(v: number) {
		if (!v) { return `0.00 ${this.unitDisplay}`; }
		let rate = v
		if (v) { return rate + ` ${this.unitDisplay}` }
	}

}

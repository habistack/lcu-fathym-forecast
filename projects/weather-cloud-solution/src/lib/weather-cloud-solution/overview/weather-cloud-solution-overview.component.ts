import { Component, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '@lcu/solutions';

@Component({
	selector: 'forge-solution-weather-cloud-solution-overview',
	templateUrl: './weather-cloud-solution-overview.component.html',
	styleUrls: ['./weather-cloud-solution-overview.component.scss']
})
export class ForgeWeatherCloudSolutionOverview extends ForgeGenericSolution
	implements ISolutionControl {
	//  Fields

	//  Properties

	//  Constructors
	constructor(protected injector: Injector) {
		super(injector);
	}

	//	Life Cycle

	//	API Methods

	//	Helpers
}

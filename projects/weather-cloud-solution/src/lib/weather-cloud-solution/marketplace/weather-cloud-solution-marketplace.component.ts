import { Component, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '@lcu/solutions';

@Component({
	selector: 'forge-solution-weather-cloud-solution-marketplace',
	templateUrl: './weather-cloud-solution-marketplace.component.html',
	styleUrls: ['./weather-cloud-solution-marketplace.component.scss']
})
export class ForgeWeatherCloudSolutionMarketplace extends ForgeGenericSolution
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

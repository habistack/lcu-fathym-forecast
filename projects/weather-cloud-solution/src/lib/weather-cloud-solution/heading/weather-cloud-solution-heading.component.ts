import { Component, Injector } from '@angular/core';
import { ForgeGenericSolution, ISolutionControl } from '@lcu/solutions';

@Component({
	selector: 'forge-solution-weather-cloud-solution-heading',
	templateUrl: './weather-cloud-solution-heading.component.html',
	styleUrls: ['./weather-cloud-solution-heading.component.scss']
})
export class ForgeWeatherCloudSolutionHeading extends ForgeGenericSolution
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

import { Component, Injector } from '@angular/core';
import { ISolutionControl, ForgeGenericSolution } from '@lcu/solutions';

@Component({
	selector: 'forge-solution-weather-cloud-solution-documentation',
	templateUrl: './weather-cloud-solution-documentation.component.html',
	styleUrls: ['./weather-cloud-solution-documentation.component.scss']
})
export class ForgeWeatherCloudSolutionDocumentation extends ForgeGenericSolution
	implements ISolutionControl {
	//  Fields

	//  Properties
	public DocsRoot: string;

	//  Constructors
	constructor(protected injector: Injector) {
		super(injector);

		this.DocsRoot = 'https://raw.githubusercontent.com/weather-cloud/lcu-weather-cloud/master/docs/';
	}

	//	Life Cycle

	//	API Methods

	//	Helpers
}

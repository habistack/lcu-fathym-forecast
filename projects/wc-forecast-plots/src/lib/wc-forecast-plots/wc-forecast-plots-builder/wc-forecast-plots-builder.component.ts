import { Component, Injector } from '@angular/core';
import { IControlBuilder } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeWcForecastPlotsDetails, ForgeWcForecastPlotsConfig } from '../wc-forecast-plots.core';

@Component({
	selector: 'forge-wc-forecast-plots-builder',
	templateUrl: './wc-forecast-plots-builder.component.html',
	styleUrls: ['./wc-forecast-plots-builder.component.scss']
})
export class ForgeWcForecastPlotsBuilderComponent
	extends ForgeGenericControl<ForgeWcForecastPlotsDetails, ForgeWcForecastPlotsConfig>
	implements IControlBuilder<ForgeWcForecastPlotsDetails, ForgeWcForecastPlotsConfig> {
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

import { Component, Injector } from '@angular/core';
import { IControlMarketplace } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeWcForecastPlotsDetails, ForgeWcForecastPlotsConfig } from '../wc-forecast-plots.core';

@Component({
	selector: 'forge-wc-forecast-plots-marketplace',
	templateUrl: './wc-forecast-plots-marketplace.component.html',
	styleUrls: ['./wc-forecast-plots-marketplace.component.scss']
})
export class ForgeWcForecastPlotsMarketplaceComponent
	extends ForgeGenericControl<ForgeWcForecastPlotsDetails, ForgeWcForecastPlotsConfig>
	implements IControlMarketplace<ForgeWcForecastPlotsDetails, ForgeWcForecastPlotsConfig> {
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

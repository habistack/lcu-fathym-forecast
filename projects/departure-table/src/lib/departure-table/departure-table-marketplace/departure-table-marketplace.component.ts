import { Component, Injector } from '@angular/core';
import { IControlMarketplace } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeDepartureTableDetails, ForgeDepartureTableConfig } from '../departure-table.core';

@Component({
	selector: 'forge-departure-table-marketplace',
	templateUrl: './departure-table-marketplace.component.html',
	styleUrls: ['./departure-table-marketplace.component.scss']
})
export class ForgeDepartureTableMarketplaceComponent
	extends ForgeGenericControl<ForgeDepartureTableDetails, ForgeDepartureTableConfig>
	implements IControlMarketplace<ForgeDepartureTableDetails, ForgeDepartureTableConfig> {
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

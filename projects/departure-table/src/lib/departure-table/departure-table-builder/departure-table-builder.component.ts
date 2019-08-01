import { Component, Injector } from '@angular/core';
import { IControlBuilder } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeDepartureTableDetails, ForgeDepartureTableConfig } from '../departure-table.core';

@Component({
	selector: 'forge-departure-table-builder',
	templateUrl: './departure-table-builder.component.html',
	styleUrls: ['./departure-table-builder.component.scss']
})

/**
 * Start with template driven forms, then move to reactive - SB
 */
export class ForgeDepartureTableBuilderComponent
	extends ForgeGenericControl<ForgeDepartureTableDetails, ForgeDepartureTableConfig>
	implements IControlBuilder<ForgeDepartureTableDetails, ForgeDepartureTableConfig> {
	//  Fields

	//  Properties

	//  Constructors
	constructor(protected injector: Injector) {
		super(injector);
	}

	// Life Cycle

	// API Methods

	// Helpers
}

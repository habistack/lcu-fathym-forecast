import { Component, Injector } from '@angular/core';
import { IControlMarketplace } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeWcDelayRiskDetails, ForgeWcDelayRiskConfig } from '../wc-delay-risk.core';

@Component({
	selector: 'forge-wc-delay-risk-marketplace',
	templateUrl: './wc-delay-risk-marketplace.component.html',
	styleUrls: ['./wc-delay-risk-marketplace.component.scss']
})
export class ForgeWcDelayRiskMarketplaceComponent
	extends ForgeGenericControl<ForgeWcDelayRiskDetails, ForgeWcDelayRiskConfig>
	implements IControlMarketplace<ForgeWcDelayRiskDetails, ForgeWcDelayRiskConfig> {
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

import { Component, Injector } from '@angular/core';
import { IControlBuilder } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeWcDelayRiskDetails, ForgeWcDelayRiskConfig } from '../wc-delay-risk.core';

@Component({
	selector: 'forge-wc-delay-risk-builder',
	templateUrl: './wc-delay-risk-builder.component.html',
	styleUrls: ['./wc-delay-risk-builder.component.scss']
})
export class ForgeWcDelayRiskBuilderComponent
	extends ForgeGenericControl<ForgeWcDelayRiskDetails, ForgeWcDelayRiskConfig>
	implements IControlBuilder<ForgeWcDelayRiskDetails, ForgeWcDelayRiskConfig> {
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

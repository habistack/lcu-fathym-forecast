import { Component, Injector } from '@angular/core';
import { IControlMarketplace } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeWcSearchFormDetails, ForgeWcSearchFormConfig } from '../wc-search-form.core';

@Component({
	selector: 'forge-wc-search-form-marketplace',
	templateUrl: './wc-search-form-marketplace.component.html',
	styleUrls: ['./wc-search-form-marketplace.component.scss']
})
export class ForgeWcSearchFormMarketplaceComponent
	extends ForgeGenericControl<ForgeWcSearchFormDetails, ForgeWcSearchFormConfig>
	implements IControlMarketplace<ForgeWcSearchFormDetails, ForgeWcSearchFormConfig> {
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

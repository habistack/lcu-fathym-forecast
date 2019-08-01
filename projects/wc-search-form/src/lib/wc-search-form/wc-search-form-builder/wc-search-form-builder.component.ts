import { Component, Injector } from '@angular/core';
import { IControlBuilder } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeWcSearchFormDetails, ForgeWcSearchFormConfig } from '../wc-search-form.core';

@Component({
	selector: 'forge-wc-search-form-builder',
	templateUrl: './wc-search-form-builder.component.html',
	styleUrls: ['./wc-search-form-builder.component.scss']
})
export class ForgeWcSearchFormBuilderComponent
	extends ForgeGenericControl<ForgeWcSearchFormDetails, ForgeWcSearchFormConfig>
	implements IControlBuilder<ForgeWcSearchFormDetails, ForgeWcSearchFormConfig> {
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

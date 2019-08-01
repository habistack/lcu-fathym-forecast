import { Component, Injector } from '@angular/core';
import { IControlBuilder } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeWcRouteMapDetails, ForgeWcRouteMapConfig } from '../wc-route-map.core';

@Component({
	selector: 'forge-wc-route-map-builder',
	templateUrl: './wc-route-map-builder.component.html',
	styleUrls: ['./wc-route-map-builder.component.scss']
})
export class ForgeWcRouteMapBuilderComponent
	extends ForgeGenericControl<ForgeWcRouteMapDetails, ForgeWcRouteMapConfig>
	implements IControlBuilder<ForgeWcRouteMapDetails, ForgeWcRouteMapConfig> {
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

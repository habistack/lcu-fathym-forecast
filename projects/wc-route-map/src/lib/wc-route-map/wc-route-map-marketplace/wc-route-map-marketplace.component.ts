import { Component, Injector } from '@angular/core';
import { IControlMarketplace } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeWcRouteMapDetails, ForgeWcRouteMapConfig } from '../wc-route-map.core';

@Component({
	selector: 'forge-wc-route-map-marketplace',
	templateUrl: './wc-route-map-marketplace.component.html',
	styleUrls: ['./wc-route-map-marketplace.component.scss']
})
export class ForgeWcRouteMapMarketplaceComponent
	extends ForgeGenericControl<ForgeWcRouteMapDetails, ForgeWcRouteMapConfig>
	implements IControlMarketplace<ForgeWcRouteMapDetails, ForgeWcRouteMapConfig> {
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

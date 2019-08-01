import { DataGridModule } from '@lowcodeunit/data-grid';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FathymSharedModule } from '@lcu/hosting';
import { BaseDisplayModule } from '@lcu/elements';
import { ForgeDepartureTableBuilderComponent } from './departure-table-builder/departure-table-builder.component';
import { ForgeDepartureTableMarketplaceComponent } from './departure-table-marketplace/departure-table-marketplace.component';
import { ForgeDepartureTableRenderComponent } from './departure-table-render/departure-table-render.component';

import { MatFormFieldModule, MatButtonModule, MatInputModule, MatSlideToggleModule } from '@angular/material';

export class ForgeDepartureTableDisplayModule extends BaseDisplayModule {
	public Builder() {
		return ForgeDepartureTableBuilderComponent;
	}

	public Marketplace() {
		return ForgeDepartureTableMarketplaceComponent;
	}

	public Render() {
		return ForgeDepartureTableRenderComponent;
	}
}

const comps = [
	ForgeDepartureTableBuilderComponent,
	ForgeDepartureTableMarketplaceComponent,
	ForgeDepartureTableRenderComponent,
];

@NgModule({
	imports: [
    FathymSharedModule,
    DataGridModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FlexLayoutModule
	],
	declarations: [
		...comps,
	],
	exports: [
    ...comps,
    FlexLayoutModule
	],
	entryComponents: [
		...comps,
	]
})
export class ForgeDepartureTableModule { }

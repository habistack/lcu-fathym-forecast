import { NgModule } from '@angular/core';

import { FathymSharedModule } from '@lcu/hosting';
import { BaseDisplayModule } from '@lcu/elements';
import { ForgeWcDelayRiskBuilderComponent } from './wc-delay-risk-builder/wc-delay-risk-builder.component';
import { ForgeWcDelayRiskMarketplaceComponent } from './wc-delay-risk-marketplace/wc-delay-risk-marketplace.component';
import { ForgeWcDelayRiskRenderComponent } from './wc-delay-risk-render/wc-delay-risk-render.component';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


export class ForgeWcDelayRiskDisplayModule extends BaseDisplayModule {
  public Builder() {
    return ForgeWcDelayRiskBuilderComponent;
  }

  public Marketplace() {
    return ForgeWcDelayRiskMarketplaceComponent;
  }

  public Render() {
    return ForgeWcDelayRiskRenderComponent;
   }
  }

const comps = [
  ForgeWcDelayRiskBuilderComponent,
  ForgeWcDelayRiskMarketplaceComponent,
  ForgeWcDelayRiskRenderComponent,
];

@NgModule({
  imports: [
    FathymSharedModule,
  MatCardModule,
  FlexLayoutModule
  ],
  declarations: [
    ...comps,
  ],
  exports: [
    ...comps,
  ],
  entryComponents: [
    ...comps,
  ]
})
export class ForgeWcDelayRiskModule { }

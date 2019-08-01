import { NgModule } from '@angular/core';

import { FathymSharedModule } from '@lcu/hosting';
import { BaseDisplayModule } from '@lcu/elements';
import { ForgeWcRouteMapBuilderComponent } from './wc-route-map-builder/wc-route-map-builder.component';
import { ForgeWcRouteMapMarketplaceComponent } from './wc-route-map-marketplace/wc-route-map-marketplace.component';
import { ForgeWcRouteMapRenderComponent } from './wc-route-map-render/wc-route-map-render.component';
import { MatSliderModule,
         MatMenuModule,
         MatIconModule,
         MatButtonModule,
         MatProgressSpinnerModule,
         MatCardModule,
         MatProgressBarModule } from '@angular/material';
import { AmModule, LoadMapService } from '@acaisoft/angular-azure-maps';
import { HttpClientModule } from '@angular/common/http';
import { NvD3Module } from 'ng2-nvd3';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WeatherCloudCommonModule } from '@weather-cloud/common';

export class ForgeWcRouteMapDisplayModule extends BaseDisplayModule {
  public Builder() {
    return ForgeWcRouteMapBuilderComponent;
  }

  public Marketplace() {
    return ForgeWcRouteMapMarketplaceComponent;
  }

  public Render() {
    return ForgeWcRouteMapRenderComponent;
  }
}

const entryComps = [ForgeWcRouteMapBuilderComponent, ForgeWcRouteMapMarketplaceComponent, ForgeWcRouteMapRenderComponent];

const comps = [...entryComps];

@NgModule({
  imports: [
    FathymSharedModule,
    WeatherCloudCommonModule,
    AmModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatSliderModule,
    NvD3Module,
    HttpClientModule
  ],
  declarations: [...comps],
  exports: [...comps],
  entryComponents: [...entryComps],
  providers: [LoadMapService]
})
export class ForgeWcRouteMapModule {}

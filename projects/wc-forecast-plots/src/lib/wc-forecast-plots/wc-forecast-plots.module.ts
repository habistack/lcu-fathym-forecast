import { NgModule } from '@angular/core';

import { FathymSharedModule } from '@lcu/hosting';
import { BaseDisplayModule } from '@lcu/elements';
import { NvD3Module } from 'ng2-nvd3';

import 'd3';
import 'nvd3';

import { ForgeWcForecastPlotsBuilderComponent } from './wc-forecast-plots-builder/wc-forecast-plots-builder.component';
import { ForgeWcForecastPlotsMarketplaceComponent } from './wc-forecast-plots-marketplace/wc-forecast-plots-marketplace.component';
import { ForgeWcForecastPlotsRenderComponent } from './wc-forecast-plots-render/wc-forecast-plots-render.component';
import { ForecastDataPlotComponent } from '../controls/forecast-data-plot/forecastDataPlot.component';
import { VariableDataPlotComponent } from '../controls/variable-data-plot/variableDataPlot.component';

export class ForgeWcForecastPlotsDisplayModule extends BaseDisplayModule {
  public Builder() {
    return ForgeWcForecastPlotsBuilderComponent;
  }

  public Marketplace() {
    return ForgeWcForecastPlotsMarketplaceComponent;
  }

  public Render() {
    return ForgeWcForecastPlotsRenderComponent;
  }
}

  const comps = [
    ForgeWcForecastPlotsBuilderComponent,
    ForgeWcForecastPlotsMarketplaceComponent,
    ForgeWcForecastPlotsRenderComponent,
    ForecastDataPlotComponent,
    VariableDataPlotComponent
  ];

@NgModule({
  imports: [
    FathymSharedModule,
    NvD3Module
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
export class ForgeWcForecastPlotsModule { }

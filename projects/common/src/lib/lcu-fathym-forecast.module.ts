import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { LcuService } from './services/lcu.service';
import { LcuComponent } from './controls/lcu/lcu.component';
import { LcuDirective } from './directives/lcu.directive';
import { LcuFathymForecastRoutingElementComponent } from './elements/routing/routing.component';
import { LcuFathymForecastApiKeysElementComponent } from './elements/api-keys/api-keys.component';
import { LcuFathymForecastAnalyticsElementComponent } from './elements/analytics/analytics.component';

@NgModule({
  declarations: [LcuComponent, LcuDirective, LcuFathymForecastRoutingElementComponent, LcuFathymForecastApiKeysElementComponent, LcuFathymForecastAnalyticsElementComponent],
  imports: [
    FathymSharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [LcuComponent, LcuDirective, LcuFathymForecastRoutingElementComponent, LcuFathymForecastApiKeysElementComponent, LcuFathymForecastAnalyticsElementComponent],
  entryComponents: [LcuFathymForecastRoutingElementComponent, LcuFathymForecastApiKeysElementComponent, LcuFathymForecastAnalyticsElementComponent]
})
export class LcuFathymForecastModule {
  static forRoot(): ModuleWithProviders<LcuFathymForecastModule> {
    return {
      ngModule: LcuFathymForecastModule,
      providers: [LcuService]
    };
  }
}

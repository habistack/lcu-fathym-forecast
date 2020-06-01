import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { LcuService } from './services/lcu.service';
import { LcuComponent } from './controls/lcu/lcu.component';
import { LcuDirective } from './directives/lcu.directive';
import { LcuFathymForecastApiKeysElementComponent } from './elements/api-keys/api-keys.component';
import { FathymForecastStateContext } from './state/fathym-forecast/fathym-forecast-state.context';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LcuComponent,
    LcuDirective,
    LcuFathymForecastApiKeysElementComponent,
  ],
  imports: [
    FathymSharedModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    LcuComponent,
    LcuDirective,
    LcuFathymForecastApiKeysElementComponent,
  ],
  entryComponents: [LcuFathymForecastApiKeysElementComponent],
})
export class LcuFathymForecastModule {
  static forRoot(): ModuleWithProviders<LcuFathymForecastModule> {
    return {
      ngModule: LcuFathymForecastModule,
      providers: [FathymForecastStateContext],
    };
  }
}

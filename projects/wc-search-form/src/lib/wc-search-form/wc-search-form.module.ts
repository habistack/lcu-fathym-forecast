import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FathymSharedModule } from '@lcu/hosting';
import { BaseDisplayModule } from '@lcu/elements';
import { ForgeWcSearchFormBuilderComponent } from './wc-search-form-builder/wc-search-form-builder.component';
import { ForgeWcSearchFormMarketplaceComponent } from './wc-search-form-marketplace/wc-search-form-marketplace.component';
import { ForgeWcSearchFormRenderComponent } from './wc-search-form-render/wc-search-form-render.component';
import { MatButtonModule,
         MatFormFieldModule,
         MatInputModule,
         MatSlideToggleModule,
         MatSliderModule,
         MatAutocompleteModule,
         MatCheckboxModule,
         MatDividerModule,
         MatSelectModule,
         MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LcuSelectModule } from '@lowcodeunit/lcu-select-common';

export class ForgeWcSearchFormDisplayModule extends BaseDisplayModule {
  public Builder() {
    return ForgeWcSearchFormBuilderComponent;
  }

  public Marketplace() {
    return ForgeWcSearchFormMarketplaceComponent;
  }

  public Render() {
    return ForgeWcSearchFormRenderComponent;
  }
}

var comps = [ForgeWcSearchFormBuilderComponent, ForgeWcSearchFormMarketplaceComponent, ForgeWcSearchFormRenderComponent];

@NgModule({
  imports: [
    FathymSharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatDividerModule,
    FlexLayoutModule,
    ToastrModule,
    LcuSelectModule
  ],
  declarations: [...comps],
  exports: [...comps, FlexLayoutModule],
  entryComponents: [...comps]
})
export class ForgeWcSearchFormModule {}

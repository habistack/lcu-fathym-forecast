import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FathymSharedModule } from "@lcu/hosting";
import { BaseSolutionModule } from "@lcu/solutions";
import { NgxMarkdownDocsModule } from "@lowcodeunit/ngx-markdown-docs";
import { ForgeWeatherCloudSolutionManage } from "./manage/weather-cloud-solution-manage.component";
import { ForgeWeatherCloudSolutionDocumentation } from "./documentation/weather-cloud-solution-documentation.component";
import { ForgeWeatherCloudSolutionHeading } from "./heading/weather-cloud-solution-heading.component";
import { ForgeWeatherCloudSolutionMarketplace } from "./marketplace/weather-cloud-solution-marketplace.component";
import { ForgeWeatherCloudSolutionOverview } from "./overview/weather-cloud-solution-overview.component";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatToolbarModule
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";

export class ForgeWeatherCloudSolutionDisplayModule extends BaseSolutionModule {
  public Documentation() {
    return ForgeWeatherCloudSolutionDocumentation;
  }

  public Heading() {
    return ForgeWeatherCloudSolutionHeading;
  }

  public Manage() {
    return ForgeWeatherCloudSolutionManage;
  }

  public Marketplace() {
    return ForgeWeatherCloudSolutionMarketplace;
  }

  public Overview() {
    return ForgeWeatherCloudSolutionOverview;
  }
}

var comps = [
  ForgeWeatherCloudSolutionDocumentation,
  ForgeWeatherCloudSolutionHeading,
  ForgeWeatherCloudSolutionManage,
  ForgeWeatherCloudSolutionMarketplace,
  ForgeWeatherCloudSolutionOverview
];

@NgModule({
  imports: [
    FathymSharedModule,
    NgxMarkdownDocsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatToolbarModule
  ],
  declarations: [...comps],
  exports: [...comps],
  entryComponents: [...comps]
})
export class ForgeWeatherCloudSolutionModule {}

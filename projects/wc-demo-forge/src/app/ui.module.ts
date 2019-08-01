import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatIconRegistry,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatDialogModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import { PageViewModule } from '@lcu/daf-ui';
import { IdentityOptions } from '@lcu/identity';
import { FathymSharedModule } from '@lcu/hosting';
import { IBuildersService, ISolutionsService } from '@lcu/elements';
import { WcDemoForgeBuildersService } from './svc/builders.service';
import { WcDemoForgeSolutionsService } from './svc/solutions.service';
import { ForgeDepartureTableModule } from '@weather-cloud/lcu-el-departure-table';
import { ForgeWeatherCloudSolutionModule } from '@weather-cloud/lcu-sln-weather-cloud';
import { ForgeWcRouteMapModule } from '@weather-cloud/lcu-el-wc-route-map';
import { ForgeWcSearchFormModule } from '@weather-cloud/lcu-el-wc-search-form';
import { WeatherCloudCommonModule } from '@weather-cloud/common';

var thirdPartyModules = [
  AngularFontAwesomeModule,
  FlexLayoutModule,
  MonacoEditorModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule
];

var thirdPartyServices = [];

var fathymModules = [
  PageViewModule,
  ForgeDepartureTableModule,
  ForgeWeatherCloudSolutionModule,
  ForgeWcRouteMapModule,
  ForgeWcSearchFormModule,
  WeatherCloudCommonModule
];

var fathymServices = [
  {
    provide: IdentityOptions,
    useValue: {
      ConfirmPasswordRecoveryURL: `/daf-identity/recover/confirm`,
      IsAuthenticatedURL: `/daf-identity/authenticated`,
      IsRegisteredPasswordQueryParamName: `password`,
      IsRegisteredUserQueryParamName: `email`,
      IsRegisteredURL: `/daf-identity/registered`,
      RecoverPasswordURL: `/daf-identity/recover/init`,
      RegisterURL: `/daf-identity/register`,
      SignInURL: `/daf-identity/signin`,
      SignOutURL: `/daf-identity/signout`
    }
  },
  { provide: IBuildersService, useClass: WcDemoForgeBuildersService },
  { provide: ISolutionsService, useClass: WcDemoForgeSolutionsService }
];

var localModules: Array<any> = [];

var localServices = [];

var modules = [FathymSharedModule, ...thirdPartyModules, ...localModules, ...fathymModules];

var services = [...thirdPartyServices, ...localServices, ...fathymServices];

var comps = [];

@NgModule({
  declarations: [...comps],
  imports: [...modules],
  exports: [...comps, ...modules],
  entryComponents: [...comps],
  providers: []
})
export class UIModule {
  //	Constructors
  constructor(public matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIModule,
      providers: [...services]
    };
  }
}

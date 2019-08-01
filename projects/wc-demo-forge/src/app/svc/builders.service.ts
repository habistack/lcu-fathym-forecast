import { Injectable, Inject } from "@angular/core";
import { BaseBuildersService, ISolutionsService, DisplayModuleSetup } from "@lcu/elements";
import { SolutionsSetupContext } from "@lcu/daf-common";
import { ForgeDepartureTableDisplayModule } from "@weather-cloud/lcu-el-departure-table";
import { ForgeWcRouteMapDisplayModule } from "@weather-cloud/lcu-el-wc-route-map";
import { ForgeWcSearchFormDisplayModule } from "@weather-cloud/lcu-el-wc-search-form";

@Injectable({
  providedIn: "root"
})
export class WcDemoForgeBuildersService extends BaseBuildersService {
  //	Fields

  //	Constructors
  constructor(protected solutionsSvc: ISolutionsService, protected solutionsSetup: SolutionsSetupContext) {
    super(solutionsSvc);

    solutionsSetup.Context.subscribe(setup => {
      this.processSolutionSetup(setup);
    });
  }

  //	API Methods

  //	Helpers
  protected loadCoreDisplayModules(): DisplayModuleSetup[] {
    return [];
  }
}

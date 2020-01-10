import { NgModule, DoBootstrap, Injector } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "@angular/common";
import { createCustomElement } from "@angular/elements";
import { BrowserModule } from "@angular/platform-browser";
import {
  AppsManagerElementComponent,
  SELECTOR_APPS_MANAGER_ELEMENT,
  ContentElementComponent,
  SELECTOR_CONTENT_ELEMENT
} from "@lcu-ide/lcu-applications-common";
import { LcuApplicationsModule } from "@lcu-ide/lcu-applications-common";
import { FathymSharedModule, LCUServiceSettings } from "@lcu/common";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule,
    LcuApplicationsModule
  ],
  providers: [
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment)
    }
  ],
  exports: [LcuApplicationsModule]
})
export class AppModule implements DoBootstrap {
  //  Constructors
  constructor(protected injector: Injector) {}

  //  Life Cycle
  public ngDoBootstrap() {
    const cfgMgr = createCustomElement(
      LcuFathymForecastFathymForecastElementComponent,
      { injector: this.injector }
    );

    customElements.define(
      SelectorLcuFathymForecastFathymForecastElement,
      cfgMgr
    );
  }
}

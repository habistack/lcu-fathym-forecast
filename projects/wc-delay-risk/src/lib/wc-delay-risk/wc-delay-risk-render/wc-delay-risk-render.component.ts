import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { IControlRender } from '@lcu/elements';
import { ForgeGenericControl } from '@lcu/daf-ui';
import { ForgeWcDelayRiskDetails, ForgeWcDelayRiskConfig } from '../wc-delay-risk.core';
import { WeatherCloudRouteDataModel, WeatherCloudRouteDataContext, NotificationService } from '@weather-cloud/common';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
	selector: 'forge-wc-delay-risk-render',
	templateUrl: './wc-delay-risk-render.component.html',
	styleUrls: ['./wc-delay-risk-render.component.scss']
})
export class ForgeWcDelayRiskRenderComponent
 extends ForgeGenericControl<ForgeWcDelayRiskDetails, ForgeWcDelayRiskConfig>
 implements OnDestroy, OnInit, IControlRender<ForgeWcDelayRiskDetails, ForgeWcDelayRiskConfig> {
 //  Fields

 //  Properties
 public RouteData: Array<WeatherCloudRouteDataModel>;
 protected forecastPlotDataSubsription: Subscription;
 protected geofenceDrawingClearedeSubscription: Subscription;

 //  Constructors
 constructor(
            protected injector: Injector,
            protected wcRouteSearch: WeatherCloudRouteDataContext,
            private notificationService: NotificationService
   ) {
   super(injector);
 }

 // Life Cycle
public ngOnInit() {

 this.wcRouteSearch.Context.subscribe(routeSearchData => {

      if (!routeSearchData || !routeSearchData['data']) { return; }

      this.RouteData = [];

      for (let i = 0; i < routeSearchData['data'].length; i ++) {
        this.RouteData.push(routeSearchData['data'][i]); // this is for now - Shannon
      }
    });

  this.geofenceDrawingClearedeSubscription = this.notificationService.ForecastDetailsCleared.subscribe(
    () => {
      this.RouteData = [];
    }
  );

    // this.forecastPlotDataSubsription = this.notificationService.ForecastPlotDataChanged.subscribe(
    //   (data: any) => {

    //     if (!data['data'] || Object.keys(data['data'][0]).length < 1) { console.error('PlotDataSubscription - No data returned'); return; }

    //     this.RouteData = [];

    //     for (let i = 0; i < data['data'].length; i ++) {
    //       this.RouteData.push(data['data'][i]); // this is for now - Shannon
    //     }
    //    }
    //   );
}

 public ngOnDestroy() {
  this.RouteData = null;

 // if (this.forecastPlotDataSubsription) { this.forecastPlotDataSubsription.unsubscribe(); }

  if (this.geofenceDrawingClearedeSubscription) { this.geofenceDrawingClearedeSubscription.unsubscribe(); }
}

 // API Methods

 // Helpers

  public StringToNumber(val: string): number {
    return parseInt(val, 10);
  }
}

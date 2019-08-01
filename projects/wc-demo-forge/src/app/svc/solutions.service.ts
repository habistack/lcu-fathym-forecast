import { Injectable } from '@angular/core';
import { BaseSolutionsService } from '@lcu/solutions';
import { SolutionModuleConfig } from '@lcu/elements';
import { ForgeWeatherCloudSolutionDisplayModule } from '@weather-cloud/lcu-sln-weather-cloud';
import { ForgeDepartureTableDisplayModule } from '@weather-cloud/lcu-el-departure-table';
import { ForgeWcRouteMapDisplayModule } from '@weather-cloud/lcu-el-wc-route-map';
import { ForgeWcSearchFormDisplayModule } from '@weather-cloud/lcu-el-wc-search-form';

@Injectable({
	providedIn: 'root'
})
export class WcDemoForgeSolutionsService extends BaseSolutionsService {
	//	Fields

	//	Constructor

	//	API Methods

	//	Helpers
	protected initSolutionModules() {
		this.localSolutionModules = [
      {
        Name: 'Solutions',
        Icon: 'fullscreen',
        BaseKey: 'forge-solution',
        Modules: <SolutionModuleConfig[]>[
          {
            Name: 'WeatherCloud',
            Control: { Base: 'forge-solution', Details: {}, Type: 'weather-cloud' },
            Solution: ForgeWeatherCloudSolutionDisplayModule,
            DisplaySetups: [
              {
                Name: 'Weather Cloud',
                Icon: 'insert_chart',
                BaseKey: 'forge-weather-cloud',
                Modules: [
                  {
                    Name: 'Departure Table',
                    Control: { Base: 'forge-weather-cloud', Details: { Elements: [], Configs: [] }, Type: 'departure-table' },
                    Display: ForgeDepartureTableDisplayModule,
                    HideDrag: false,
                    BuilderState: 'Render',
                  },
                  {
                    Name: 'Route Map',
                    Control: { Base: 'forge-weather-cloud', Details: { Elements: [], Configs: [] }, Type: 'wc-route-map' },
                    Display: ForgeWcRouteMapDisplayModule,
                    HideDrag: false,
                    BuilderState: 'Render',
                  },
                  {
                    Name: 'Search Form',
                    Control: { Base: 'forge-weather-cloud', Details: { Elements: [], Configs: [] }, Type: 'wc-search-form' },
                    Display: ForgeWcSearchFormDisplayModule,
                    HideDrag: false,
                    BuilderState: 'Render',
                  }
                ]
              },
            ],
          },
        ],
      },
		];
	}
}

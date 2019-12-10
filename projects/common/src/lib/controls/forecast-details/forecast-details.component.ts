import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TemperaturePlot } from '../plots/temperature-plot/temperature-plot';
import { PotentialRoadStatePlot } from '../plots/potential-road-state_plot/potential-road-state-plot';
import { PotentialDelayRiskPlot } from '../plots/potential-delay-risk-plot/potential-delay-risk-plot';
import { CrosswindPlot } from '../plots/crosswind-plot/crosswind-plot';
import { PrecipitationPlot } from '../plots/precipitation-plot/precipitation-plot';
import { SnowDepthPlot } from '../plots/snow-depth-plot/snow-depth-plot';
import { WindPlot } from '../plots/wind-plot/wind-plot';

@Component({
  selector: 'lcu-forecast-details',
  templateUrl: './forecast-details.component.html',
  styleUrls: ['./forecast-details.component.css']
})
export class ForecastDetailsComponent implements OnInit {

  public ForecastData;
  public ValidTimes;
  public PlotConfigs;
  public SelectedUnitSystem;
  public RouteDisplayName;

  constructor(protected notificationService: NotificationService, @Inject(MAT_DIALOG_DATA) public passedData: any) {
    this.ForecastData = { forecast: this.passedData.allData.forecast };
    this.ValidTimes = [];
    this.passedData.allData.points.forEach(x => {
      this.ValidTimes.push(x.absoluteSeconds);
    });
    console.log(this.ForecastData);
    this.RouteDisplayName = this.passedData.allData.displayName;

    this.PlotConfigs = [
      new TemperaturePlot('F', 'Forecast'),
      new PotentialRoadStatePlot(null, 'Forecast'),
      new PotentialDelayRiskPlot(null, 'Forecast'),
      new CrosswindPlot(null, 'Forecast'),
      new PrecipitationPlot('mm/hr', 'Forecast'),
      new SnowDepthPlot('mm', 'Forecast'),
      new WindPlot('m/s', 'Forecast'),
    ];
  }

  ngOnInit() {
    this.SelectedUnitSystem = 'English';
  }

  public ToggleMeasurementUnit(val) {
    this.SelectedUnitSystem = val;
    console.log('selected unit: ', this.SelectedUnitSystem);

    if (this.SelectedUnitSystem === 'Metric') {
      console.log('converting to Metric...')
      console.log('windspeed: ', this.ForecastData.forecast.windSpeed)
      this.ForecastData.forecast.surfaceTemperature = this.ForecastData.forecast.surfaceTemperature.map(x => {
        return this.convertFtoC(x);
      });
      this.ForecastData.forecast.roadTemperature = this.ForecastData.forecast.roadTemperature.map(x => {
        return this.convertFtoC(x);
      });
      this.ForecastData.forecast.precipitationRate = this.ForecastData.forecast.precipitationRate.map(x => {
        return this.convertINtoMM(x);
      })
      this.ForecastData.forecast.windSpeed = this.ForecastData.forecast.windSpeed.map(x => {
        return this.convertMlPHourToMePSec(x);
      })
      console.log('windspeed: ', this.ForecastData.forecast.windSpeed)
    }

    if (this.SelectedUnitSystem === 'English') {
      console.log('converting to English...');
      console.log('windspeed: ', this.ForecastData.forecast.windSpeed)
      this.ForecastData.forecast.surfaceTemperature = this.ForecastData.forecast.surfaceTemperature.map(x => {
        return this.convertCtoF(x);
      });
      this.ForecastData.forecast.roadTemperature = this.ForecastData.forecast.roadTemperature.map(x => {
        return this.convertCtoF(x);
      });
      this.ForecastData.forecast.precipitationRate = this.ForecastData.forecast.precipitationRate.map(x => {
        return this.convertINtoMM(x);
      })
      this.ForecastData.forecast.windSpeed = this.ForecastData.forecast.windSpeed.map(x => {
        return this.convertMePSecToMlPHour(x);
      });
      console.log('windspeed: ', this.ForecastData.forecast.windSpeed)
    }

    this.PlotConfigs = [
      new TemperaturePlot('C', 'Forecast'),
      new PotentialRoadStatePlot(null, 'Forecast'),
      new PotentialDelayRiskPlot(null, 'Forecast'),
      new CrosswindPlot(null, 'Forecast'),
      new PrecipitationPlot('mm/hr', 'Forecast'),
      new SnowDepthPlot('mm', 'Forecast'),
      new WindPlot('m/s', 'Forecast'),
    ];
  }

  protected convertFtoC(val) {
    const newVal = (val - 32) * 5 / 9;
    return newVal;
  }

  protected convertCtoF(val) {
    const newVal = val * 9 / 5 + 32;
    return newVal;
  }

  protected convertINtoMM(val) {
    return val * 25.4;
  }

  protected convertMMtoIN(val) {
    return val * 0.03937008;
  }

  protected convertMlPHourToMePSec(val) {
    return val / 2.237;
  }

  protected convertMePSecToMlPHour(val) {
    return val * 2.237;
  }

  public ExportToJson() {
    const objectData = this.passedData.allData;
    const filename = 'forecast_data.json';
    const contentType = 'application/json;charset=utf-8;';
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      const blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }



}

# Weather Cloud Common - @weather-cloud/common

...

## WeatherCloud UI Componenets

This project provides Angular 2+ components that interface with the Weather Cloud forecast backend.

### Configure

Check the azure maps subscription key and server url are correct in src/app/const.ts, run the dev server with ng serve.

### Forecast Data Plot Component

Provides vertical list of charts given a forecast data response from weathercloud backend:

| param | in/out | description | example |
| --- | --- | --- | --- |
| forecastData | Input | The forecast data for this route or set of points, keep in mind a response may have a list of route forecasts but this is expecting a single forecast. | ``` <forecast-data-plot [forecastData]="fcstData" [validTimes]="validTimes"></forecast-data-plot> ``` |
| validTimes | Input | The array of valid times as UTC epoch timestamp, this is returned from backend with forecast data | |

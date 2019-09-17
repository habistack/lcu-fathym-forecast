import { ForecastConditionsModel } from './forecast-conditions.model';
import { RoutePointModel } from './route-point.model';

export class ForecastDataModel {
    /**
     * Forecast weather conditions and values
     */
    public forecast: ForecastConditionsModel;

    /**
     * Route points and absolute seconds
     */
    public points: Array<RoutePointModel>;
}
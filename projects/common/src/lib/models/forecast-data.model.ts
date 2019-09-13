import { ForecastConditionsModel } from './forecast-conditions.model';
import { RoutePointModel } from './route-point.model';

export class ForecastDataModel {
    /**
     * Forecast weather conditions and values
     */
    public ForecastConditions: Array<ForecastConditionsModel>;

    /**
     * Route points and absolute seconds
     */
    public RoutePoints: Array<RoutePointModel>;
}
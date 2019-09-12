import { ForecastConditionModel } from './forecast-condition.model';

export class ForecastConditionsModel {
    /**
     * Forecast conditions
     */
    public ForecastConditions: Array<ForecastConditionModel>;

    /**
     * Lat / Long points for route
     */
    public Points: Array<number>;
}
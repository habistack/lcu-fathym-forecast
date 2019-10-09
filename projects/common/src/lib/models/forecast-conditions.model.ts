
export class ForecastConditionsModel {
    /**
     * Road temperature values
     */
    public roadTemperature: Array<number>;

    /**
     * Surface temperature values
     * PBI-5265: The UI will refer to this as 'Air Temp' to prevent confusion with road temp.
     * Since the backend returns it as 'surfaceTemperature', we will leave the property name the same.
     */
    public surfaceTemperature: Array<number>;
}

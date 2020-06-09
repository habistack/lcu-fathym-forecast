export class ChartOptionsModel {
    public chart: {
        type: string,
        height: number,
        margin: {
            top: number,
            right: number,
            bottom: number,
            left: number
        }
    };
    public forceY: any;
    public useInteractiveGuideline: any;
    public callback: any;
    public x: any;
    public y: any;
    public showValues: boolean;
    public valueFormat: any;
    public duration: number;
    public interactiveLayer: any;
    public legend: any;
    public xAxis: number;
    public yAxis: number;
}
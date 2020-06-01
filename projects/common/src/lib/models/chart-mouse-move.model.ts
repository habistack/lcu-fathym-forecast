export class ChartMouseMoveModel {

    public Data: any;
    public Index: number;
    public Value: number;

    constructor(data: any, index: number, value: number) {
        this.Data = data;
        this.Index = index;
        this.Value = value;
    }
}
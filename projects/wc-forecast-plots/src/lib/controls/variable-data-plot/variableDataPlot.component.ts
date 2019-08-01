
import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Plot } from '../plots/plots';
import { NotificationService } from '@weather-cloud/common/lcu.api';
import { Subscription } from 'rxjs/internal/Subscription';

declare let d3: any;

@Component({
    selector: 'variable-data-plot',
    templateUrl: './variableDataPlot.component.html',

    styleUrls: [
        '../../../../../../node_modules/nvd3/build/nv.d3.css',
        '../plots/plots.css'
    ],
    encapsulation: ViewEncapsulation.None
})

export class VariableDataPlotComponent implements OnInit {
    @Input() forecastData: any;
    @Input() validTimes: any;
    @Input() plot: Plot;

    @ViewChild('d3plot') d3plot: any;

    public ChartData: Array<any>;
    public Options: object;
    public ShowPlots: boolean;

    gradientId = 0;

    ngOnInit() {
        this.ShowPlots = true;
        this.plot.setD3Plot(this.d3plot);
        this.Refresh();
    }

    public Clear(): void {
        this.Options = null;
        this.ChartData = null;
        this.ShowPlots = false;
    }

    public Refresh(): void {
        this.plot.loadChartData(this.forecastData, this.validTimes);
        this.Options = this.plot.getOptions();
        this.ChartData = this.plot.getChartData();
    }
}

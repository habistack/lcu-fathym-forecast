import { ChartMouseMoveModel } from './../../models/chart-mouse-move.model';

import { Output, EventEmitter } from '@angular/core';

declare let d3: any;

export abstract class Plot {

  @Output() chartMousemove = new EventEmitter();
  series;
  gradientId = 0;
  d3plot: any;

  validTimes;
  forecastData;

  public displayTitle: string;


  constructor(public title: string, public requiredVars: object, public units: string, public subTitle?: string) {

    const sub: string = (!subTitle || subTitle !== 'null' || subTitle !== null) ? subTitle : '';

    if (units) {
      this.displayTitle = title + ' (' + units + ') ' + sub;
    } else {
      this.displayTitle = title + ' ' + sub;
    }
  }

  public getChartData(): Array<any> {
    const chartSeries = [];
    for (const series of this.series) {
      const varName = series.varName;
      const varOptions = this.requiredVars[varName];
      if (!varOptions.color) {
        continue;
      }
      series.color = varOptions.color;
      chartSeries.push(series);
    }
    return chartSeries;
  }

  public setD3Plot(d3plot: any): void {
    this.d3plot = d3plot;
  }

  public hasData(forecastData: any): boolean {
    if (!forecastData) {
      return false;
    }
    for (const varName in this.requiredVars) {
      if (varName in forecastData.forecast) {
        return true;
      }
    }
    return false;
  }

  public getOptions(): object {
    const options = {
      chart: {
        type: 'lineChart',
        height: 220,
        margin: {
          top: 20,
          right: 55,
          bottom: 50,
          left: 55
        },
        forceY: this.getForceY(),
        useInteractiveGuideline: true,
        callback: function (currentPlot) {
          return function (chart) {
            if (!chart) { return; }
            const svg = d3.select(chart.container);
            // let grad_id = currentPlot.title.replace(' ','');
            const grad_id = currentPlot.title.replace(/ /g, '');
            currentPlot.loadGradients(currentPlot, chart, svg, grad_id);
            svg.select('rect')
              .attr('fill', 'url(#' + grad_id + ')')
              .attr('patternTransform', 'tranlate(0,-30)')
              .style('opacity', 0.75);
            chart.update();
          }
        }(this),
        x: function (d) { return d.x; },
        y: function (d) { return d.y; },
        showValues: true,
        valueFormat: function (d) {
          return d3.format(',.4f')(d);
        },
        duration: 500,
        interactiveLayer: {
          dispatch: {
            elementMousemove: function (currentPlot) {
              return (e) => {
                 const cls = currentPlot.closest(currentPlot.validTimes, e.pointXValue);
                // const cl = cls[0];
                // const i = cls[1];
                 const chartMouseModel: ChartMouseMoveModel = new ChartMouseMoveModel( cls, cls[1], cls[0] );
                
                currentPlot.chartMousemove.emit(chartMouseModel);
              }
            }(this)
          }
        },
        legend: function () {
          return [['#00dd00', '#b760b7', '#0000dd'], ['Wet', 'Mix', 'Frozen']];
        },
        xAxis: {
          tickFormat: (x) => {
            return d3.time.format('%a %H:%M')(new Date(x * 1000));
          }
        },
        yAxis: {
          ticks: 6,
          // ticks: (y) => {
          // 	return this.getTickCount(y);
          // },
          // // axisLabelDistance: -10,
          tickFormat: (x) => {
            return this.getTickFormat(x);
            // return d3.format('.02f')(x);
          }
        }
      }
    };
    return options;
  }

  // protected makeLegend(colors, labels): Array<any> {
  // 	let l: Array<any> = [];
  // 		for (var i = 0; i < colors.length; i++) {
  // 				l.push({
  // 				color:colors[i],
  // 				label:labels[i]
  // 			});
  // 		}
  // 		return l;
  // }

  public closest(arr, closestTo): Array<number> {
    let closest = Math.max.apply(null, arr); // Get the highest number in arr in case it match nothing.
    let ci = -1;
    for (let i = 0; i < arr.length; i++) { // Loop the array
      if (arr[i] >= closestTo && arr[i] < closest) {
        closest = arr[i]; // Check if it's higher than your number, but lower than your closest value
        ci = i;
      }
    }
    return [closest, ci]; // return the value
  }

  public loadChartData(forecastData: object, validTimes: Array<number>): void {
    this.validTimes = validTimes;
    this.forecastData = forecastData;
    this.series = [];
    for (let varName in this.requiredVars) {
      let varOptions = this.requiredVars[varName];
      let name = varOptions.title;
      if (varName in forecastData['forecast']) {
        var varData = forecastData['forecast'][varName];
        var values = [];
        for (var i = 0; i < varData.length; i++) {
          var y = varData[i];
          if (validTimes[i]) {
            var x = validTimes[i];
          }
          values.push({
            y: y,
            x: x
          });
        }
        let chartData = {
          key: name,
          values: values,
          varName: varName,
          color: varOptions.color
        };
        this.series.push(chartData);
      }
    }
  }

  public getColor(v: number): string {
    return '#ffffff';
  }

  public getForceY(): any {
    return null;
  }

  public getTickCount(v: number): number {
    return v;
  }

  public getTickFormat(v: any): string {
    return v;
  }

  public loadGradients(currentPlot, chart, svg, gradientId): void {
    const series = currentPlot.series;
    const xDomain = chart.xAxis.domain();
    const xdiff = xDomain[1] - xDomain[0];
    const xmin = xDomain[0];
    if (series.length === 0) {
      return;
    }
    const n = series[0].values.length;
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', gradientId)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')
      .attr('spreadMethod', 'pad');
    for (let i = 0; i < n; i++) {
      const val = {};
      const x = series[0].values[i].x;
      for (const ser of series) {
        val[ser.key] = ser.values[i].y;
      }
      const stopColor = currentPlot.getColor(val);
      const stopPercent = (x - xmin) / xdiff;

      gradient.append('stop')
        .attr('offset', 100 * stopPercent + '%')
        .attr('stop-color', stopColor)
        .attr('stop-opacity', 1);
    }
  }

  public hexToRgb(hex): Array<number> {
    hex = hex.replace(/#/, '');
    const match = [
      hex.substring(0, 2),
      hex.substring(2, 4),
      hex.substring(4, 6)
    ];
    return [parseInt(match[0], 16),
    parseInt(match[1], 16),
    parseInt(match[2], 16)]
  }

  public valToHex(val): string {
    let hexString = val.toString(16);
    if (hexString.length % 2) {
      hexString = '0' + hexString;
    }
    return hexString;
  }

  public interpChannel(a, b, percentage): number {
    return Math.round(a + (b - a) * percentage / 100);
  }

  public findColorBetween(left, right, percentage): string {

    left = this.hexToRgb(left);
    right = this.hexToRgb(right);
    const color = [
      this.interpChannel(left[0], right[0], percentage),
      this.interpChannel(left[1], right[1], percentage),
      this.interpChannel(left[2], right[2], percentage)
    ]
    return '#' + this.valToHex(color[0]) + this.valToHex(color[1]) + this.valToHex(color[2]);
  }
}




import { Component, OnInit } from '@angular/core';
import { LazyElementConfig } from '@lowcodeunit/lazy-element';

@Component({
  selector: 'lcu-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public Config: LazyElementConfig;

  constructor() {}

  public ngOnInit(): void {
    this.Config = {
      Assets: ['/assets/lcu-fathym-forecast.lcu.js'],
      ElementName: 'lcu-fathym-forecast-api-keys-element'
    };
  }
}

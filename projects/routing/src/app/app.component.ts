import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';

import { Subscription } from 'rxjs';
import {
  DataPipeConstants,
  LCUServiceSettings,
  FathymSharedModule,
  RealTimeService,
  FaviconsService,
} from '@lcu/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {
  }

  public ngOnInit(): void {}
}

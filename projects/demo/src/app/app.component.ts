import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ToggleThemeUtil } from '@habistack/lcu-fathym-forecast-common';
// import { NotificationService } from 'projects/common/src/lib/services/notification.service';
import { ForecastDataModel } from 'projects/common/src/lib/models/forecast-data.model';
import { NotificationService } from '@habistack/lcu-fathym-forecast-common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lcu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
}

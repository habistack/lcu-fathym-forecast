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

export class AppComponent implements OnInit, OnDestroy {

  /**
   * Title Icon
   */
  public Icon: string;

  /**
   * Main title
   */
  public PageTitle: string;

  /**
   * selected theme
   */
  public SelectedTheme: string;

  /**
   * Subtitle
   */
  public SubTitle: string;

  /**
   * Title
   */
  public Title: string;

  @ViewChild('topOfSummarization', { static: false }) TopOfSummarization: ElementRef;

  constructor(protected overlayContainer: OverlayContainer, protected notificationService: NotificationService) {
    this.PageTitle = 'Angular Flex Layout';
    this.Title = 'Fathym Forecast';
    this.SubTitle = '';
    this.Icon = 'drive_eta';
  }
  protected forecastPlotDataSubscription: Subscription;

  public ngOnInit(): void {
    this.resetTheme();
    this.forecastPlotDataSubscription = this.notificationService.ForecastPlotDataChanged.subscribe(data => {
      setTimeout(x => {
        this.TopOfSummarization.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }

    );
  }

  /**
   * Set default theme
   */
  protected resetTheme(): void {
    this.changeTheme('theme');
  }

  /**
   * Toggle themes
   *
   * @param val theme to change to
   */
  protected changeTheme(val: string): void {
    this.SelectedTheme = val;

    // const element: HTMLElement = this.overlayContainer.getContainerElement();
    // const classList: DOMTokenList = element.classList;

    // const toggleTheme: ToggleThemeUtil = new ToggleThemeUtil();
    // classList.add(ToggleThemeUtil.Toggle(element.classList, val));

    // update favicon when theme changes
    // this.changeFavicon(this.SelectedTheme);
  }

  ngOnDestroy() {
    this.forecastPlotDataSubscription.unsubscribe();
  }
}

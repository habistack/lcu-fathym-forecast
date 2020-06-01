import { Component, OnInit, Injector, ElementRef, ViewChild } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NotificationService } from '../../services/notification.service';

export class LcuFathymForecastRoutingElementState {}

export class LcuFathymForecastRoutingContext extends LCUElementContext<
  LcuFathymForecastRoutingElementState
> {}

export const SELECTOR_LCU_FATHYM_FORECAST_ROUTING_ELEMENT =
  'lcu-fathym-forecast-routing-element';

@Component({
  selector: SELECTOR_LCU_FATHYM_FORECAST_ROUTING_ELEMENT,
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.scss'],
})
export class LcuFathymForecastRoutingElementComponent
  extends LcuElementComponent<LcuFathymForecastRoutingContext>
  implements OnInit {
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

  @ViewChild('topOfSummarization', { static: false })
  TopOfSummarization: ElementRef;

  constructor(
    protected injector: Injector,
    protected overlayContainer: OverlayContainer,
    protected notificationService: NotificationService
  ) {
    super(injector);

    this.PageTitle = 'Angular Flex Layout';
    this.Title = 'Fathym Forecast';
    this.SubTitle = '';
    this.Icon = 'drive_eta';
  }
  protected forecastPlotDataSubscription: Subscription;

  public ngOnInit(): void {
    this.resetTheme();
    this.forecastPlotDataSubscription = this.notificationService.ForecastPlotDataChanged.subscribe(
      (data) => {
        setTimeout((x) => {
          this.TopOfSummarization.nativeElement.scrollIntoView({
            behavior: 'smooth',
          });
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

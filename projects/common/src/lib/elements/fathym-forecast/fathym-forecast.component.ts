import {
  Component,
  OnInit,
  Injector,
  OnDestroy,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { TooltipService } from '@lowcodeunit/lcu-charts-common';

export class LcuFathymForecastFathymForecastElementState {}

export class LcuFathymForecastFathymForecastContext extends LCUElementContext<LcuFathymForecastFathymForecastElementState> {}

export const SelectorLcuFathymForecastFathymForecastElement =
  'lcu-fathym-forecast-fathym-forecast-element';

@Component({
  selector: SelectorLcuFathymForecastFathymForecastElement,
  templateUrl: './fathym-forecast.component.html',
  styleUrls: ['./fathym-forecast.component.scss'],
})
export class LcuFathymForecastFathymForecastElementComponent
  extends LcuElementComponent<LcuFathymForecastFathymForecastContext>
  implements OnInit, OnDestroy {
  //  Fields
  protected forecastPlotDataSubscription: Subscription;

  //  Properties
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
  public TopOfSummarization: ElementRef;

  //  Constructors
  constructor(
    protected injector: Injector,
    protected overlayContainer: OverlayContainer,
    protected notificationService: NotificationService,
    private chartToolTipService : TooltipService, 
    private viewContainerRef: ViewContainerRef
  ) {
    super(injector);

    this.PageTitle = 'Angular Flex Layout';
    this.Title = 'Fathym Forecast';
    this.SubTitle = '';
    this.Icon = 'drive_eta';
  }

  //  Life Cycle
  public ngOnDestroy() {
    this.forecastPlotDataSubscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.chartToolTipService.injectionService.setRootViewContainer(this.viewContainerRef);
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

  //  API Methods

  //  Helpers
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
}

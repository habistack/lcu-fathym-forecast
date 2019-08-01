import { Component, Injector } from '@angular/core';
import { ISolutionControl, ForgeGenericSolution } from '@lcu/solutions';
import { isStatusSuccess } from '@lcu/common';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Loading } from '@lcu/core';
import { PageUIService } from '@lcu/daf-common';
import { WeatherCloudConfig, WeatherCloudConfigContext } from '@weather-cloud/common';

@Component({
    selector: 'forge-solution-weather-cloud-solution-manage',
    templateUrl: './weather-cloud-solution-manage.component.html',
    styleUrls: ['./weather-cloud-solution-manage.component.scss']
})
export class ForgeWeatherCloudSolutionManage extends ForgeGenericSolution
    implements ISolutionControl {
    //  Fields

    //  Properties
    public Loading: Loading;
    public WCSolutionManageForm: FormGroup;

    public WeatherCloudConfig: WeatherCloudConfig;

    //  Constructors
    constructor(
        protected weatherCloudConfigContext: WeatherCloudConfigContext,
        protected pgUiSvc: PageUIService,
        protected injector: Injector) {

        super(injector);

        this.Loading = new Loading();
    }

    // Life Cycle
    public ngOnInit() {
        super.ngOnInit();

        this.WCSolutionManageForm = new FormGroup({
            APIKey: new FormControl('', {validators: Validators.required}),
            LBSKey: new FormControl('', {validators: Validators.required}),
            ServerURL: new FormControl('', {validators: Validators.required}),
            // VariableNames: new FormControl('', {validators: Validators.required})
        });

        this.weatherCloudConfigContext.Loading.subscribe(loading => this.Loading.Set(loading));
        this.weatherCloudConfigContext.Context.subscribe(
          weathercloud => {
              this.WeatherCloudConfig = weathercloud;

              if (!this.WeatherCloudConfig) {
                return;
              }
              this.setFormValues();
            }
          );

        this.onChanges();
    }

    protected onChanges(): void {
      this.WCSolutionManageForm.valueChanges.subscribe(val => {
        this.WeatherCloudConfig.APIKey = this.WCSolutionManageForm.value.APIKey;
        this.WeatherCloudConfig.LBSKey = this.WCSolutionManageForm.value.LBSKey;
        this.WeatherCloudConfig.ServerURL = this.WCSolutionManageForm.value.ServerURL;
       // this.WeatherCloudConfig.VariableNames = this.WCSolutionManageForm.value.VariableNames;
      });
    }

    protected setFormValues(): void {
      this.WCSolutionManageForm.patchValue(this.WeatherCloudConfig);
    }

    // API Methods
    public Save() {
        this.Loading.Set(true);

        this.weatherCloudConfigContext.Save(this.WeatherCloudConfig).subscribe(
            (status) => {
                if (isStatusSuccess(status)) {
                    this.pgUiSvc.Notify.Signal('Provisioning Configuration saved successfully');
                } else {
                    console.log(status);

                    this.pgUiSvc.Notify.Signal(status.Message);
                }
            },
            (err) => {
                console.log(err);

                this.pgUiSvc.Notify.Signal('Unknown error. Please try again, or contact support if the problem continues');
            },
            () => {
                this.Loading.Set(false);
            });
    }

    // Helpers
}

import { AbstractControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { FathymForecastStateContext } from '../../state/fathym-forecast/fathym-forecast-state.context';
import { FathymForecastState } from '../../state/fathym-forecast/fathym-forecast.state';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

export class LcuFathymForecastApiKeysElementState {}

export class LcuFathymForecastApiKeysContext extends LCUElementContext<
  LcuFathymForecastApiKeysElementState
> {}

export const SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT =
  'lcu-fathym-forecast-api-keys-element';

@Component({
  selector: SELECTOR_LCU_FATHYM_FORECAST_API_KEYS_ELEMENT,
  templateUrl: './api-keys.component.html',
  styleUrls: ['./api-keys.component.scss'],
})

export class LcuFathymForecastApiKeysElementComponent
  extends LcuElementComponent<LcuFathymForecastApiKeysContext>
  implements OnInit {
  //  Fields

/**
 * Access primaryKeyControl field within the form group
 */
public get PrimaryKeyControl(): AbstractControl {
  return this.KeysFormGroup.get('primaryKeyControl');
}

/**
 * Access secondaryKeyControl field within the form group
 */
public get SecondaryKeyControl(): AbstractControl {
  return this.KeysFormGroup.get('secondaryKeyControl');
}

  //  Properties
  public APIKeyTypes: string[];

  /**
   * Toggle visibility of primary key
   */
  public HidePrimaryKey: boolean;

  /**
   * Toggle visibility of secondary key
   */
  public HideSecondaryKey: boolean;

  /**
   * Form group for primary and secondary keys
   */
  public KeysFormGroup: FormGroup;

  /**
   * Forecast state
   */
  public State: FathymForecastState;

  /**
   * Page description text
   */
  public PageDescription: string;

  /**
   * Page description detail text
   */
  public PageDescriptionDetails: string;

  /**
   * Title
   */
  public Title: string;

  //  Constructors
  constructor(
    protected injector: Injector,
    protected forecastCtxt: FathymForecastStateContext
  ) {
    super(injector);

    this.Title = 'Fathym Forecaster';
    this.PageDescription = 'Harnessing the power of machine learning to create safer roads.'
    this.PageDescriptionDetails = 'The Fathym Forecaster combines the world\'s best weather \
                                   forecasts with statistics-based, machine-learning techniques \
                                   to tackle the largest datasets. including road weather.';

    this.setFieldToggles();
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();

    this.setupForm();

    this.forecastCtxt.Context.subscribe((state) => {
      this.State = state;

      if (this.State) {
        this.stateChanged();
      }
    });
  }

  //  API Methods

  public ExternalLink(val: string): void {
    window.open(val, '_blank');
  }

  public Demo(): void {

  }

  public Description(): void {

  }

  //  Helpers
  protected setupForm(): void {
    this.KeysFormGroup = new FormGroup({
      primaryKeyControl: new FormControl('', {validators: Validators.required}),
      secondaryKeyControl: new FormControl('', {validators: Validators.required})
    });
  }

  /**
   * Setup Initila toggle values for inputs
   */
  protected setFieldToggles(): void {
    this.HidePrimaryKey = this.HideSecondaryKey = true;
  }

  /**
   * Listen for state changes
   */
  protected stateChanged() {
    debugger;
    if (this.State.APIKeys) {
      this.APIKeyTypes = Object.keys(this.State.APIKeys);
    } else {
      this.APIKeyTypes = [];
    }
    this.updateKeyValues();
  }

  /**
   * Update API Key values
   */
  protected updateKeyValues(): void {
    this.PrimaryKeyControl.setValue(
      this.State.APIKeys.primaryKey || ''
    );

    this.SecondaryKeyControl.setValue(
      this.State.APIKeys.secondaryKey || ''
    );
  }
}

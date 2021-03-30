import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ForecastPlotsComponent } from './forecast-plots.component';

describe('ForecastPlotsComponent', () => {
  let component: ForecastPlotsComponent;
  let fixture: ComponentFixture<ForecastPlotsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastPlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastPlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

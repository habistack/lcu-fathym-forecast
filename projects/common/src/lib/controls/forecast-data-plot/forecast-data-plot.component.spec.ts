import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ForecastDataPlotComponent } from './forecast-data-plot.component';

describe('ForecastPlotComponent', () => {
  let component: ForecastDataPlotComponent;
  let fixture: ComponentFixture<ForecastDataPlotComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastDataPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastDataPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

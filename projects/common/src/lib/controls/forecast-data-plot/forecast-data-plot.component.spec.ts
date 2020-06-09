import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastDataPlotComponent } from './forecast-data-plot.component';

describe('ForecastPlotComponent', () => {
  let component: ForecastDataPlotComponent;
  let fixture: ComponentFixture<ForecastDataPlotComponent>;

  beforeEach(async(() => {
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

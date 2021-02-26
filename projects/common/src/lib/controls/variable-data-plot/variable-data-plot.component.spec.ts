import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VariableDataPlotComponent } from './variable-data-plot.component';

describe('VariableDataPlotComponent', () => {
  let component: VariableDataPlotComponent;
  let fixture: ComponentFixture<VariableDataPlotComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableDataPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableDataPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

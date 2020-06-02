import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableDataPlotComponent } from './variable-data-plot.component';

describe('VariableDataPlotComponent', () => {
  let component: VariableDataPlotComponent;
  let fixture: ComponentFixture<VariableDataPlotComponent>;

  beforeEach(async(() => {
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

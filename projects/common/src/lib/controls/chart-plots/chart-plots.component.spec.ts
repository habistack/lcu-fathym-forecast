import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChartPlotsComponent } from './chart-plots.component';

describe('ChartPlotsComponent', () => {
  let component: ChartPlotsComponent;
  let fixture: ComponentFixture<ChartPlotsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartPlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

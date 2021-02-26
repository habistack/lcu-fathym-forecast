import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ForecastDetailsComponent } from './forecast-details.component';

describe('ForecastDetailsComponent', () => {
  let component: ForecastDetailsComponent;
  let fixture: ComponentFixture<ForecastDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

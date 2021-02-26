import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DepartureTableComponent } from './departure-table.component';

describe('DepartureTableComponent', () => {
  let component: DepartureTableComponent;
  let fixture: ComponentFixture<DepartureTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartureTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

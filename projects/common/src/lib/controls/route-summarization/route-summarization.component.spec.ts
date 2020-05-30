import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteSummarizationComponent } from './route-summarization.component';

describe('RouteSummarizationComponent', () => {
  let component: RouteSummarizationComponent;
  let fixture: ComponentFixture<RouteSummarizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteSummarizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteSummarizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

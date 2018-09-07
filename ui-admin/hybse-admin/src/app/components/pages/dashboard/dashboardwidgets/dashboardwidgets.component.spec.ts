import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardwidgetsComponent } from './dashboardwidgets.component';

describe('DashboardwidgetsComponent', () => {
  let component: DashboardwidgetsComponent;
  let fixture: ComponentFixture<DashboardwidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardwidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardwidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

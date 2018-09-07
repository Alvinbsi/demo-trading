import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardinfoComponent } from './dashboardinfo.component';

describe('DashboardinfoComponent', () => {
  let component: DashboardinfoComponent;
  let fixture: ComponentFixture<DashboardinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

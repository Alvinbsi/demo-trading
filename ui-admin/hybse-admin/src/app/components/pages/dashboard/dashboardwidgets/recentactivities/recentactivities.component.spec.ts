import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentactivitiesComponent } from './recentactivities.component';

describe('RecentactivitiesComponent', () => {
  let component: RecentactivitiesComponent;
  let fixture: ComponentFixture<RecentactivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentactivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

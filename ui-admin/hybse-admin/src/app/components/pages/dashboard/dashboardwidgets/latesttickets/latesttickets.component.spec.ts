import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestticketsComponent } from './latesttickets.component';

describe('LatestticketsComponent', () => {
  let component: LatestticketsComponent;
  let fixture: ComponentFixture<LatestticketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestticketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

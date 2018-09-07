import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressCenterComponent } from './press-center.component';

describe('PressCenterComponent', () => {
  let component: PressCenterComponent;
  let fixture: ComponentFixture<PressCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

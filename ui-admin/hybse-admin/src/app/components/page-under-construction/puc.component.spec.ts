import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PucComponent } from './puc.component';

describe('PucComponent', () => {
  let component: PucComponent;
  let fixture: ComponentFixture<PucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

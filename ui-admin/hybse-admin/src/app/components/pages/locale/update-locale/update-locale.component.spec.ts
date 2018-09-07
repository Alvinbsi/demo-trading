import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLocaleComponent } from './update-locale.component';

describe('UpdateLocaleComponent', () => {
  let component: UpdateLocaleComponent;
  let fixture: ComponentFixture<UpdateLocaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLocaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLocaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

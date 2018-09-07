import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLocaleComponent } from './create-locale.component';

describe('CreateLocaleComponent', () => {
  let component: CreateLocaleComponent;
  let fixture: ComponentFixture<CreateLocaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLocaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLocaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorAddUserComponent } from './investor-add-user.component';

describe('InvestorAddUserComponent', () => {
  let component: InvestorAddUserComponent;
  let fixture: ComponentFixture<InvestorAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorAddUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

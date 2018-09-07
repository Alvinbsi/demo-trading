import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorEditUserComponent } from './investor-edit-user.component';

describe('InvestorEditUserComponent', () => {
  let component: InvestorEditUserComponent;
  let fixture: ComponentFixture<InvestorEditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorEditUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

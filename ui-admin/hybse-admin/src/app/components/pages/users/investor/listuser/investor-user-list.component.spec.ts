import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorUserListComponent } from './investor-user-list.component';

describe('InvestorUserListComponent', () => {
  let component: InvestorUserListComponent;
  let fixture: ComponentFixture<InvestorUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

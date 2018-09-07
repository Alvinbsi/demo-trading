import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMembersComponent } from './company-members.component';

describe('CompanyMembersComponent', () => {
  let component: CompanyMembersComponent;
  let fixture: ComponentFixture<CompanyMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHistoryComponent } from './company-history.component';

describe('CompanyHistoryComponent', () => {
  let component: CompanyHistoryComponent;
  let fixture: ComponentFixture<CompanyHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

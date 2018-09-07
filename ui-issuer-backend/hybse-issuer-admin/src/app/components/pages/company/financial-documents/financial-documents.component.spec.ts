import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialDocumentsComponent } from './financial-documents.component';

describe('FinancialDocumentsComponent', () => {
  let component: FinancialDocumentsComponent;
  let fixture: ComponentFixture<FinancialDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

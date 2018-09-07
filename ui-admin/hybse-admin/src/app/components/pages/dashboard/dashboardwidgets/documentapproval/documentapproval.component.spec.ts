import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentapprovalComponent } from './documentapproval.component';

describe('DocumentapprovalComponent', () => {
  let component: DocumentapprovalComponent;
  let fixture: ComponentFixture<DocumentapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuerRegisterWizardComponent } from './issuer-register-wizard.component';

describe('IssuerRegisterWizardComponent', () => {
  let component: IssuerRegisterWizardComponent;
  let fixture: ComponentFixture<IssuerRegisterWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuerRegisterWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuerRegisterWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

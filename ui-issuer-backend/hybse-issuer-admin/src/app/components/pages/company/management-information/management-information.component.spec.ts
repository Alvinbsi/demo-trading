import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementInformationComponent } from './management-information.component';

describe('ManagementInformationComponent', () => {
  let component: ManagementInformationComponent;
  let fixture: ComponentFixture<ManagementInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincontentComponent } from './admincontent.component';

describe('AdmincontentComponent', () => {
  let component: AdmincontentComponent;
  let fixture: ComponentFixture<AdmincontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

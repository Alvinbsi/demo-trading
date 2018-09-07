import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTemplatesComponent } from './update-templates.component';

describe('UpdateTemplatesComponent', () => {
  let component: UpdateTemplatesComponent;
  let fixture: ComponentFixture<UpdateTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

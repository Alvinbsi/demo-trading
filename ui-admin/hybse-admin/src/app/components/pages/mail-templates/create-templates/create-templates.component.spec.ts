import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTemplatesComponent } from './create-templates.component';

describe('CreateTemplatesComponent', () => {
  let component: CreateTemplatesComponent;
  let fixture: ComponentFixture<CreateTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

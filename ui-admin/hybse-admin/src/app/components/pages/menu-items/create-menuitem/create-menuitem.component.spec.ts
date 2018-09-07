import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMenuitemComponent } from './create-menuitem.component';

describe('CreateMenuitemComponent', () => {
  let component: CreateMenuitemComponent;
  let fixture: ComponentFixture<CreateMenuitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMenuitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMenuitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

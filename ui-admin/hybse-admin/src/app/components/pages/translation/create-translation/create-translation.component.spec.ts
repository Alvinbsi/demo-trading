import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTranslationComponent } from './create-translation.component';

describe('CreateTranslationComponent', () => {
  let component: CreateTranslationComponent;
  let fixture: ComponentFixture<CreateTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

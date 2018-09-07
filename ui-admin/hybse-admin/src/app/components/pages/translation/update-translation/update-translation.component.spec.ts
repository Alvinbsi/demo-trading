import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTranslationComponent } from './update-translation.component';

describe('UpdateTranslationComponent', () => {
  let component: UpdateTranslationComponent;
  let fixture: ComponentFixture<UpdateTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

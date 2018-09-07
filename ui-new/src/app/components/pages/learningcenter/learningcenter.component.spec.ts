import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningcenterComponent } from './learningcenter.component';

describe('LearningcenterComponent', () => {
  let component: LearningcenterComponent;
  let fixture: ComponentFixture<LearningcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

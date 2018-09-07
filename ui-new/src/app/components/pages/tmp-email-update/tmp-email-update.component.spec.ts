import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmpEmailUpdateComponent } from './tmp-email-update.component';

describe('TmpEmailUpdateComponent', () => {
  let component: TmpEmailUpdateComponent;
  let fixture: ComponentFixture<TmpEmailUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmpEmailUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmpEmailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageapprovalComponent } from './imageapproval.component';

describe('ImageapprovalComponent', () => {
  let component: ImageapprovalComponent;
  let fixture: ComponentFixture<ImageapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

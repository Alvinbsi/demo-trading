import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCategorCreateComponent } from './page-categor-create.component';

describe('PageCategorCreateComponent', () => {
  let component: PageCategorCreateComponent;
  let fixture: ComponentFixture<PageCategorCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCategorCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCategorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCategoryUpdateComponent } from './page-category-update.component';

describe('PageCategoryUpdateComponent', () => {
  let component: PageCategoryUpdateComponent;
  let fixture: ComponentFixture<PageCategoryUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCategoryUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCategoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

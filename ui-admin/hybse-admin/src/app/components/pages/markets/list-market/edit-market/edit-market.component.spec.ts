import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMarketComponent } from './edit-market.component';

describe('EditMarketComponent', () => {
  let component: EditMarketComponent;
  let fixture: ComponentFixture<EditMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

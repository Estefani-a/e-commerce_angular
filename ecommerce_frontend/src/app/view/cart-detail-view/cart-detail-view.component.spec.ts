import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailViewComponent } from './cart-detail-view.component';

describe('CartDetailViewComponent', () => {
  let component: CartDetailViewComponent;
  let fixture: ComponentFixture<CartDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDetailViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

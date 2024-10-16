import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductViewComponent } from './edit-product-view.component';

describe('EditProductViewComponent', () => {
  let component: EditProductViewComponent;
  let fixture: ComponentFixture<EditProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

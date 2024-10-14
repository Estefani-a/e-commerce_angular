import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.Services';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface NavigationState {
  product: Product;
}

@Component({
  selector: 'app-edit-product-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product-view.component.html',
  styleUrl: './edit-product-view.component.css'
})

export class EditProductViewComponent {
  product: Product | null = null;
  productName: string = '';
  productPrice: number | null = null;
  successAlert: boolean = false;
  errorAlert: boolean = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private productService: ProductService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const state = navigation.extras.state as NavigationState;
      this.product = state.product;
      if (this.product) {
        this.productName = this.product.name;
        this.productPrice = this.product.price;
      }
    }
  }

  handleSave() {
    if (this.product) {
      //actualiza los valores del producto
      this.product.name = this.productName;
      this.product.price = this.productPrice || 0;

      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: () => {
          this.successAlert = true;
          setTimeout(() => (this.successAlert = false), 3000);
        },
        error: () => {
          this.errorAlert = true;
          setTimeout(() => (this.errorAlert = false), 3000);
        }
      });
    }
  }

  navigateToProductList() {
    this.router.navigate(['/product-list']);
  }
}
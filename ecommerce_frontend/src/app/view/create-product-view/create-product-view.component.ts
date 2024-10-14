import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.Services';

@Component({
  selector: 'app-create-product-view',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-product-view.component.html',
  styleUrl: './create-product-view.component.css'
})

export class CreateProductViewComponent {
  productName: string = '';
  productPrice: number | undefined;
  products: Array<{ name: string; price: number }> = [];

  constructor(public router: Router, private productService: ProductService) { }

  handleAddProduct(event: Event) {
    event.preventDefault();

    if (this.productName.trim() === '' || this.productPrice === undefined || this.productPrice <= 0) {
      alert('Por favor, ingresa un nombre y un precio válido.');
      return;
    }

    const newProduct = {
      name: this.productName,
      price: this.productPrice
    };

    this.productService.createProduct(newProduct).subscribe((response: any) => {
      this.products.push(response);
      this.productName = '';
      this.productPrice = undefined;
      alert(`Producto ${newProduct.name} creado con éxito!`);
    }, (error: any) => {
      console.error(error);
    });
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response: any) => {
      this.products = response;
    }, (error: any) => {
      console.error(error);
    });
  }
}
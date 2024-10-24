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

  //Array local para almacenar los productos
  //products: Array<{ id: number, name: string, price: number }> = [];

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

    //Crear un nuevo producto y agregarlo al array local
    /*const newProduct = {
      id: this.products.length + 1,
      name: this.productName,
      price: this.productPrice
    };*/

    //this.products.push(newProduct);
    
    //Limpiar los campos de entrada
    /*this.productName = '';
    this.productPrice = undefined;

    alert(`Producto ${newProduct.name} creado con éxito!`);*/


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
    
    //Productos harcodeados
    /*this.products = [
      { id: 1, name: 'Mouse', price: 23500 },
      { id: 2, name: 'Teclado', price: 34000 },
      { id: 3, name: 'Auriculares', price: 16000 }
    ];*/
  }
}
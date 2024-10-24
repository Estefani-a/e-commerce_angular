import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.Services';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-list-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-view.component.html',
  styleUrl: './product-list-view.component.css'
})
export class ProductListViewComponent {
  constructor(public router: Router, private productService: ProductService) {}

  products: Product[] = [];
  error: string | null = null;

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        this.products = response;
      },
      error: (error: any) => {
        this.error = 'Error al obtener productos.';
        console.error('Error al obtener productos:', error);
      },
      complete: () => {
        console.log('Productos obtenidos con éxito');
      }
    });
    //harcoded
    /*this.products = [
      { id: 1, name: 'Mouse', price: 23500 },
      { id: 2, name: 'Teclado', price: 34000 },
      { id: 3, name: 'Auriculares', price: 16000 },
      { id: 4, name: 'Monitor', price: 350000 },
      { id: 5, name: 'Laptop', price: 1650000},
    ];*/
  }

  handleDelete(id: number) {
    this.productService.deleteProduct(id).pipe(
      catchError((error: any) => {
        this.error = 'No se puede eliminar el producto.';
        console.error('Error al eliminar el producto:', error);
        return of (null);
      })
    ).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== id);
        this.error = null;
        console.log(`Producto ${id} eliminado`);
      }
    });
    
    //Eliminar el producto hardcodeado
    /*this.products = this.products.filter(product => product.id !== id);
    console.log(`Producto ${id} eliminado`);*/
  }


  navigateToEdit(product: Product) {
    this.router.navigate(['/edit-product/:id'], { state: { product } });
  }
}
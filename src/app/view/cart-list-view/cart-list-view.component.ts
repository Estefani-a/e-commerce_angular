import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.Services';

@Component({
  selector: 'app-cart-list-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-list-view.component.html',
  styleUrls: ['./cart-list-view.component.css']
})
export class CartListViewComponent implements OnInit {
  carts: any[] = [];
  cartDetails: any[] = [];

  constructor(public router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getAllCarts().subscribe((response: any) => {
      this.carts = response;
      this.carts.forEach((cart: any) => {
        this.cartService.getCartById(cart.id).subscribe({
          next: (cartDetails: any) => {
            this.cartDetails.push(cartDetails);
          },
          error: (error: any) => {
            console.error('Error al obtener detalles del carrito:', error);
          }
        });
      });
    });
  }

  handleDelete(id: number) {
    this.cartService.deleteCart(id).subscribe(() => {
      this.carts = this.carts.filter(cart => cart.id !== id);
      console.log(`Carrito ${id} eliminado`);
    });
  }

  handleSelect(id: number) {
    const selectedCart = this.carts.find(cart => cart.id === id);
    if (selectedCart) {
      this.router.navigate([`/cart-detail/${id}`], { state: { cart: selectedCart } });
    } else {
      console.error('Carrito no encontrado');
    }
  }

  getTotal(cart: any): number {
    const cartDetail = this.cartDetails.find(detail => detail.id === cart.id);
    if (cartDetail) {
      return cartDetail.totalWithDiscount;
    } else {
      return 0;
    }
  }
}

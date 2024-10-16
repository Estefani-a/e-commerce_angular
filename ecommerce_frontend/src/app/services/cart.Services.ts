import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartDetails } from '../view/cart-detail-view/cart-details.interface';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})

export class CartService {
  private apiUrl = 'http://localhost:8080/cart';

  constructor(private http: HttpClient) {}

  //obtener todos los carritos
  getCarts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get`);
  }

  getAllCarts() {
    return this.http.get(`${this.apiUrl}/get`);
  }

  //agregar nuevo carrito
  addCart(cart: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/add`, cart, { headers });
  }

  //eliminar un carrito por su ID
  deleteCart(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  //obtener un carrito por ID
  getCartById(id: number): Observable<CartDetails> {
    return this.http.get(`${this.apiUrl}/get/${id}`).pipe(
      map((response: any) => {
        const cartDetails: CartDetails = {
          id: response?.id,
          state: response?.state,
          type: response?.type,
          total: response?.total,
          totalWithDiscount: response?.totalWithDiscount,
          products: response?.products,
          discountAmount: response?.discountAmount
        };
        return cartDetails;
      })
    );
  }
  updateCartState(cartId: number, state: string): Observable<any> {
    const cart = { id: cartId, state: state };
    return this.http.put(`${this.apiUrl}/update`, cart);
  }
}

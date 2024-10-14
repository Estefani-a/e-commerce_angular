import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from '../services/cart.Services';
@Injectable({
  providedIn: 'root'
})
export class CartDetailService {

  private apiUrl = 'http://localhost:8080/detail';

  constructor(private http: HttpClient, private cartService: CartService) { }

  findById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addProductToCart(form: any) {
    return this.http.post(`${this.apiUrl}/add`, form);
  }

  removeProductFromCart(form: any) {
    return this.http.delete(`${this.apiUrl}/remove`, { body: form });
  }

  buyCart(form: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/buy`, form).pipe(
      map((response: any) => {
        //acá pasamos el estado a  "CERRADO"
        this.cartService.updateCartState(form.cartId, 'CERRADO').subscribe({
          next: () => {
            console.log('Estado del carrito actualizado con éxito');
          },
          error: (error: any) => {
            console.error('Error al actualizar el estado del carrito:', error);
          }
        });
        return response;
      })
    );
  }
}
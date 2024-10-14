import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get(`${this.apiUrl}/get`);
  }

  getProductById(id: number) {
    return this.http.get(`${this.apiUrl}/get/${id}`);
  }

  createProduct(product: any) {
    return this.http.post(`${this.apiUrl}/save`, product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put(`${this.apiUrl}/update/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`).pipe(
      tap((response: any) => response.id)
    );
  }

}
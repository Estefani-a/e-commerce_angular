import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.Services';
import { CartDetailService } from '../../services/cartDetail.Services';
import { CartService } from '../../services/cart.Services';

@Component({
  selector: 'app-cart-detail-view',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './cart-detail-view.component.html',
  styleUrls: ['./cart-detail-view.component.css']
})

export class CartDetailViewComponent implements OnInit {
  discountDescription: string = '';
  availableProducts: any[] = [];
  cartProducts: any[] = [];
  cart = { id: 2, type: 'Fecha_Especial', state: 'ABIERTO' }; //ejemplo de carrito
  discounts = { total: 0, discountAmount: 0, totalWithDiscount: 0 };
  successAlert = false;
  errorAlert = false;
  cartError = false;

  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  displayedCartColumns: string[] = ['id', 'name', 'price', 'actions'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartDetailService: CartDetailService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const cartId = this.route.snapshot.paramMap.get('id');

    if (cartId !== null) {
      this.cart.id = +cartId;
      this.cartError = false;
    } else {
      console.error('Cart ID no encontrado');
      this.cartError = true;
      this.router.navigate(['/carts']);
      return;
    }

    this.loadAvailableProducts();
    this.loadCartDetails();
    this.loadCartProducts();
  }

  loadAvailableProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products: Object) => {
        if (Array.isArray(products)) {
          this.availableProducts = products as any[];
        } else {
          console.error('Error al obtener productos: La respuesta no es un arreglo');
        }
      },
      error => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  loadCartDetails(): void {
    this.cartService.getCartById(this.cart.id).subscribe({
      next: (response: any) => {
        const { type, total, totalWithDiscount, discountDescription = '' } = response;
        this.cart.type = type;
        this.discounts = {
          total,
          totalWithDiscount,
          discountAmount: total - totalWithDiscount
        };
        this.discountDescription = discountDescription;
      },
      error: (error: any) => {
        console.error('Error al obtener detalles del carrito:', error);
      }
    });
  }

  loadCartProducts(): void {
    this.cartDetailService.findById(this.cart.id).subscribe(
      (products: Object) => {
        if (Array.isArray(products)) {
          this.cartProducts = products as any[];
        } else {
          console.error('Error al obtener productos del carrito: La respuesta no es un arreglo');
        }
      },
      error => {
        console.error('Error al obtener productos del carrito:', error);
      }
    );
  }

  handleAddProduct(productId: number): void {
    const productToAdd = this.availableProducts.find(product => product.id === productId);

    if (productToAdd) {
      const isProductInCart = this.cartProducts.some(product => product.id === productId);

      if (!isProductInCart) {
        const form = { cartId: this.cart.id, productId: productId };

        this.cartDetailService.addProductToCart(form).subscribe(
          () => {
            this.loadCartProducts();
            this.loadCartDetails();
            this.successAlert = true;
          },
          error => {
            console.error('Error al agregar producto al carrito:', error);
            this.errorAlert = true;
          }
        );
      } else {
        this.errorAlert = true;
      }
    } else {
      console.error('Producto no encontrado');
    }
  }

  handleDeleteProduct(productId: number): void {
    const form = { cartId: this.cart.id, productId: productId };

    this.cartDetailService.removeProductFromCart(form).subscribe(
      () => {
        this.loadCartProducts();  //actualiza lista de productos
        this.loadCartDetails();   //actualiza detalles del carrito
        this.successAlert = true;
      },
      error => {
        console.error('Error al eliminar producto del carrito:', error);
        this.errorAlert = true;
      }
    );
  }

  handleBuyCart(): void {
    const form = { cartId: this.cart.id };
    this.cartDetailService.buyCart(form).subscribe({
      next: (response: any) => {
        console.log('Compra realizada con éxito:', response);
        this.successAlert = true;
        this.cartService.updateCartState(this.cart.id, 'CERRADO').subscribe({
          next: (response: any) => {
            console.log('Estado del carrito actualizado con éxito:', response);
            this.cart.state = 'CERRADO'; //actualiza el estado del carrito
          },
          error: (error: any) => {
            console.error('Error al actualizar el estado del carrito:', error);
          }
        });
        setTimeout(() => {
          this.router.navigate(['/carts']);
        }, 2000); //redirige a la lista de carritos después de 2 segundos
      },
      error: (error: any) => {
        console.error('Error al realizar la compra:', error);
        this.errorAlert = true;
      }
    });
  }

  navigateToCartList(): void {
    this.router.navigate(['/carts']);
  }
}

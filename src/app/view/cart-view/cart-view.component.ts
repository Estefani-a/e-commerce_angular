import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.Services'; // Asegúrate de que este import esté presente
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent {
  cartType: string = '';
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(public router: Router, private cartService: CartService) {} //Inyecta el servicio aca

  async handleCreateCart(type: string) {
    this.cartType = type;

    let cartTypeEnum: string;
    switch (type) {
        case 'Comun':
            cartTypeEnum = 'COMUN';
            break;
        case 'Fecha Especial':
            cartTypeEnum = 'FECHA_ESPECIAL';
            break;
        case 'VIP':
            cartTypeEnum = 'VIP';
            break;
        default:
            console.error('Tipo de carrito desconocido:', type);
            return;
    }

    const newCart = {
        type: cartTypeEnum,
        items: [],
    };

    //Log para verificar los datos
    console.log('Datos del carrito a enviar:', newCart);

    //Envia el carrito
    try {
        const createdCart = await firstValueFrom(this.cartService.addCart(newCart));
        console.log(`Carrito ${cartTypeEnum} creado con éxito:`, createdCart);
        this.showAlertMessage(`Carrito ${cartTypeEnum} creado con éxito.`);
    } catch (error: unknown) {
        const errorMessage = (error as { message?: string }).message || 'Error desconocido';
        console.error('Error al crear el carrito:', errorMessage);
        this.showAlertMessage('Error al crear el carrito: ' + errorMessage);
    }
  }


  showAlertMessage(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  closeAlert() {
    this.showAlert = false;
  }
}

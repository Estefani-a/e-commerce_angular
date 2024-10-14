import { Routes } from '@angular/router';
import { HomeViewComponent } from './view/home-view/home-view.component';
import { CartViewComponent } from './view/cart-view/cart-view.component';
import { CartListViewComponent } from './view/cart-list-view/cart-list-view.component';
import { CreateProductViewComponent } from './view/create-product-view/create-product-view.component';
import { ProductListViewComponent } from './view/product-list-view/product-list-view.component';
import { EditProductViewComponent } from './view/edit-product-view/edit-product-view.component';
import { CartDetailViewComponent } from './view/cart-detail-view/cart-detail-view.component';

export const routes: Routes = [
    { path: '', component: HomeViewComponent }, // Ruta a HomeView
    { path: 'create-cart', component: CartViewComponent },
    { path: 'carts', component: CartListViewComponent },
    { path: 'create-product', component: CreateProductViewComponent },
    { path: 'product-list', component: ProductListViewComponent },
    { path: 'edit-product/:id', component: EditProductViewComponent },
    { path: 'cart-detail/:id', component: CartDetailViewComponent },
];

import { Routes } from '@angular/router';
import { AuthComponent } from '../features/auth/components/auth';
import { HomeComponent } from '../features/home/home';
import { guestGuard } from '../core/guards/guest-guard';
import { authGuard } from '../core/guards/auth-guard';
import { Cart } from '../features/cart/cart';
import { OrderSuccessComponent } from '../features/order-success/order-success';
import { MyOrders } from '../features/my-orders/my-orders';

export const routes: Routes = [
    { path: '', component: AuthComponent, canActivate: [guestGuard], data: { hideHeader: true } },
    {
        path: 'home', component: HomeComponent, canActivate: [authGuard]
    },
    {
        path: 'cart', component: Cart, canActivate: [authGuard]
    },
    {
        path: 'order-success', component: OrderSuccessComponent, canActivate: [authGuard]
    },
    { 
        path: 'my-orders', component: MyOrders, canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'home' // Let the guards figure out where they actually belong
    }
];

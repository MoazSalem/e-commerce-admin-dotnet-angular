import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../../shared/models/cartItem';
import { tap } from 'rxjs';
import { AuthService } from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http = inject(HttpClient);
  private authService = inject(AuthService);
  private readonly apiUrl = environment.apiUrl;
  public cartItems = signal<CartItem[]>([]);
  public totalCartItems = computed(() =>
    this.cartItems().reduce((total, item) => total + (item.quantity || 1), 0)
  );

  constructor() {
    this.cartItems.set(JSON.parse(localStorage.getItem('cartItems') ?? "[]"));
  }

  completeOrder() {
    return this.http.post(this.apiUrl + 'Orders', {
      items: this.cartItems()
    }).pipe(
      tap(
        order => {
          console.log("Ordered Sucessfully:" + order), this.cartItems.set([]), this.updateLocalStorageCart(true)
        }
      )
    )
  }

  addItemToCart(item: CartItem) {
    console.log(item.productId + " Added to cart")
    this.cartItems.update(ci => [...ci, item]);
    this.updateLocalStorageCart();
  }

  removeFromCart(id: number) {
    this.cartItems.update(items => items.filter(ci => ci.productId != id))
    this.updateLocalStorageCart();
  }

  changeQuantity(id: number, decrease: boolean = false) {
    this.cartItems.update(items =>
      items.map(ci =>
        ci.productId === id
          ? { ...ci, quantity: decrease ? (ci.quantity || 1) - 1 : (ci.quantity || 1) + 1 }
          : ci
      )
    );
    this.updateLocalStorageCart();
  }

  updateLocalStorageCart(remove: boolean = false) {
    remove ? localStorage.removeItem('cartItems' + "-" + this.authService.currentUser()?.email) : localStorage.setItem('cartItems' + "-" + this.authService.currentUser()?.email, JSON.stringify(this.cartItems()));
  }

}

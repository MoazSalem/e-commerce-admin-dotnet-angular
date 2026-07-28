import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../../shared/models/cartItem';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  increaseQuantity(existingItem: CartItem) {
    throw new Error('Method not implemented.');
  }
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  public cartItems = signal<CartItem[]>([]);
  public totalCartItems = computed(() => 
    this.cartItems().reduce((total, item) => total + (item.quantity || 1), 0)
  ); 

  constructor() {
    this.cartItems.set(JSON.parse(localStorage.getItem('cartItems') ?? "[]"));
  }

  completeOrder() {
    return this.http.post(this.apiUrl + '/Orders', {
      Items: this.cartItems()
    }).pipe(
      tap(
        order => {
          console.log("Ordered Sucessfully:" + order), this.cartItems.set([]), localStorage.setItem('cartItems', JSON.stringify(this.cartItems()))
        }
      )
    )
  }

  addItemToCart(item: CartItem) {
    console.log(item.id + " Added to cart")
    this.cartItems.update(ci => [...ci, item]);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems()));
  }

  removeFromCart(id: number) {
    this.cartItems.update(items => items.filter(ci => ci.id != id))
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems()));
  }

  changeQuantity(id: number, decrease: boolean = false) {
    this.cartItems.update(items =>
      items.map(ci =>
        ci.id === id
          ? { ...ci, quantity: decrease ? (ci.quantity || 1) - 1 : (ci.quantity || 1) + 1 }
          : ci
      )
    );
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems()));
  }
}

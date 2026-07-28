import { Component, computed, inject, signal } from '@angular/core';
import { CartItemCard } from './components/cart-item-card/cart-item-card';
import { OrderSummary } from './components/order-summary/order-summary';
import { CartItem } from '../../shared/models/cartItem';
import { HeaderComponent } from "../../layout/header-component/header-component";
import { CartService } from '../../core/services/cart-service';

@Component({
  selector: 'app-cart',
  imports: [CartItemCard, OrderSummary, HeaderComponent],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  private cartService = inject(CartService);
  cartItems = signal<CartItem[]>([]);

  constructor(){
    this.cartItems.set(this.cartService.cartItems())
  }

  // Computed signals automatically recalculate when cartItems changes
  subtotal = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  });

  taxAmount = computed(() => {
    // Assuming a static tax rate for demonstration
    return this.subtotal() * 0.14; 
  });

  finalTotal = computed(() => {
    return this.subtotal() + this.taxAmount();
  });

  // Event Handlers
  handleUpdateQuantity(event: { id: number, decrease?: boolean}) {
    this.cartService.changeQuantity(event.id, event.decrease ?? false);
    this.cartItems.set(this.cartService.cartItems());
  }

  handleRemoveItem(id: number) {
    this.cartService.removeFromCart(id);
    this.cartItems.set(this.cartService.cartItems())
  }


}

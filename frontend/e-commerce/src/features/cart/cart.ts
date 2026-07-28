import { Component, computed, signal } from '@angular/core';
import { CartItemCard } from './components/cart-item-card/cart-item-card';
import { OrderSummary } from './components/order-summary/order-summary';
import { CartItem } from '../../shared/models/cartItem';
import { HeaderComponent } from "../../layout/header-component/header-component";

@Component({
  selector: 'app-cart',
  imports: [CartItemCard, OrderSummary, HeaderComponent],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cartItems = signal<CartItem[]>([
    {
      id: 1,
      name: 'Precision Mechanical Keyboard',
      unitPrice: 189.00,
      quantity: 1
    },
    {
      id: 2,
      name: 'Studio Acoustic Headphones',
      unitPrice: 349.00,
      quantity: 1
    },
    {
      id: 3,
      name: 'Lumina Adaptive Desk Lamp',
      unitPrice: 89.99,
      quantity: 2
    }
  ]);

  // Computed signals automatically recalculate when cartItems changes
  subtotal = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  });

  taxAmount = computed(() => {
    // Assuming a static tax rate for demonstration (e.g., ~8%)
    return this.subtotal() * 0.08; 
  });

  finalTotal = computed(() => {
    return this.subtotal() + this.taxAmount();
  });

  // Event Handlers
  handleUpdateQuantity(event: { id: number, newQuantity: number }) {
    this.cartItems.update(items => 
      items.map(item => item.id === event.id ? { ...item, quantity: event.newQuantity } : item)
    );
  }

  handleRemoveItem(id: number) {
    this.cartItems.update(items => items.filter(item => item.id !== id));
  }
}

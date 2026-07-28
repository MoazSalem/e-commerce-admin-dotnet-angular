import { Component, input, output } from '@angular/core';
import { CartItem } from '../../../../shared/models/cartItem';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item-card',
  imports: [CurrencyPipe],
  templateUrl: './cart-item-card.html',
  styleUrl: './cart-item-card.css',
})
export class CartItemCard {
  item = input.required<CartItem>();

  updateQuantity = output<{ id: number, decrease?: boolean }>();
  removeItem = output<number>();

  onIncrease() {
    this.updateQuantity.emit({ id: this.item().productId });
  }

  onDecrease() {
    if (this.item().quantity > 1) {
      this.updateQuantity.emit({ id: this.item().productId, decrease: true });
    }
  }

  onRemove() {
    this.removeItem.emit(this.item().productId);
  }
}

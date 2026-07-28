import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  imports: [CurrencyPipe],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.css',
})
export class OrderSummary {
  subtotal = input.required<number>();
  tax = input.required<number>();
  total = input.required<number>();

  confirmOrder = output();

  handleConfirmOrder(){
    this.confirmOrder.emit();
  }
}

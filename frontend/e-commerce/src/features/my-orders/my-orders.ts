import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HeaderComponent } from '../../layout/header-component/header-component';
import { Orders } from '../../core/services/orders';

@Component({
  selector: 'app-my-orders',
  imports: [CurrencyPipe, HeaderComponent],
  templateUrl: './my-orders.html',
})
export class MyOrders {
  protected readonly cartService = inject(Orders);
}

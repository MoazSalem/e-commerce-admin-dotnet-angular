import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HeaderComponent } from '../../layout/header-component/header-component';
import { OrdersService } from '../../core/services/orders-service';
import { PaginationComponent } from "../../shared/components/pagination-component/pagination-component";

@Component({
  selector: 'app-my-orders',
  imports: [CurrencyPipe, HeaderComponent, PaginationComponent],
  templateUrl: './my-orders.html',
})
export class MyOrders {
  protected readonly ordersService = inject(OrdersService);
}

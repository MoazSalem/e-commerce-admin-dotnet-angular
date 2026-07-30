import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RecentOrder } from '../../../../shared/models/dashboard';

@Component({
  selector: 'app-recent-orders-component',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './recent-orders-component.html',
})
export class RecentOrdersComponent {
  orders = input.required<RecentOrder[]>();
}

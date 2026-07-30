import { Component, inject } from '@angular/core';
import { DashboardService } from '../../../../core/services/dashboard-service';
import { PaginationComponent } from "../../../../shared/components/pagination-component/pagination-component";
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders-component',
  imports: [PaginationComponent, CurrencyPipe, DatePipe],
  templateUrl: './orders-component.html',
})
export class OrdersComponent {
  protected dashboard = inject(DashboardService);
}

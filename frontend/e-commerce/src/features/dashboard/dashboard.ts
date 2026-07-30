import { Component, inject, signal } from '@angular/core';
import { DashboardMetrics, RecentOrder } from '../../shared/models/dashboard';
import { RecentOrdersComponent } from "./components/recent-orders-component/recent-orders-component";
import { StatCardComponent } from "./components/stat-card-component/stat-card-component";
import { SidebarComponent } from "./components/sidebar-component/sidebar-component";
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { HeaderComponent } from "../../layout/header-component/header-component";
import { DashboardService } from '../../core/services/dashboard-service';

@Component({
  selector: 'app-dashboard',
  imports: [RecentOrdersComponent, StatCardComponent, SidebarComponent, CurrencyPipe, DecimalPipe, HeaderComponent],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected dashboardService = inject(DashboardService);
}

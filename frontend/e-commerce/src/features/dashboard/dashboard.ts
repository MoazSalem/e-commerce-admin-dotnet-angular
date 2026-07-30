import { Component, inject, signal } from '@angular/core';
import { DashboardMetrics, RecentOrder } from '../../shared/models/dashboard';
import { RecentOrdersComponent } from "./components/recent-orders-component/recent-orders-component";
import { StatCardComponent } from "./components/stat-card-component/stat-card-component";
import { SidebarComponent } from "./components/sidebar-component/sidebar-component";
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { HeaderComponent } from "../../layout/header-component/header-component";
import { DashboardService } from '../../core/services/dashboard-service';
import { AddProductComponent } from './components/add-product-component/add-product-component';

@Component({
  selector: 'app-dashboard',
  imports: [RecentOrdersComponent, StatCardComponent, SidebarComponent, CurrencyPipe, DecimalPipe, HeaderComponent, AddProductComponent],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected dashboardService = inject(DashboardService);

  currentView = signal<'dashboard' | 'addProduct'>('dashboard');

  changeView(view: 'dashboard' | 'addProduct') {
    this.currentView.set(view);
  }

  // Method to handle successful form submission
  handleProductSave(dtoPayload: any) {
    // Send to .NET Backend via HttpClient here
    console.log('Sending payload to API:', dtoPayload);
    
    // Return to dashboard after saving
    this.changeView('dashboard');
  }
}

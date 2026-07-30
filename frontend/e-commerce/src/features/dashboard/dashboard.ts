import { Component, inject, signal } from '@angular/core';
import { DashboardMetrics, RecentOrder } from '../../shared/models/dashboard';
import { RecentOrdersComponent } from "./components/recent-orders-component/recent-orders-component";
import { StatCardComponent } from "./components/stat-card-component/stat-card-component";
import { SidebarComponent } from "./components/sidebar-component/sidebar-component";
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { HeaderComponent } from "../../layout/header-component/header-component";
import { DashboardService } from '../../core/services/dashboard-service';
import { AddProductComponent } from './components/add-product-component/add-product-component';
import { InventoryComponent } from "./components/inventory-component/inventory-component";
import { ProductService } from '../../core/services/product-service';
import { CreateProductDto } from '../../shared/models/product';
import { OrdersComponent } from "./components/orders-component/orders-component";

@Component({
  selector: 'app-dashboard',
  imports: [RecentOrdersComponent, StatCardComponent, SidebarComponent, CurrencyPipe, DecimalPipe, HeaderComponent, AddProductComponent, InventoryComponent, OrdersComponent],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected dashboardService = inject(DashboardService);
  private productService = inject(ProductService);


  currentView = signal<'dashboard' | 'addProduct' | 'inventory' | 'orders'>('dashboard');

  changeView(view: 'dashboard' | 'addProduct' | 'inventory' | 'orders') {
    this.currentView.set(view);
  }

  // Method to handle successful form submission
  handleProductSave(dtoPayload: CreateProductDto) {
    this.productService.addProduct(dtoPayload).subscribe({
      next: (response) => {
        console.log('Success!', response);
      },
      error: (err) => console.error('Error adding product', err)
    });
    
    // Return to dashboard after saving
    this.changeView('dashboard');
  }
}

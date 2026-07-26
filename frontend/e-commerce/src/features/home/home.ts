import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header-component/header-component';
import { FilterSidebarComponent } from './componenets/filter-sidebar/filter-sidebar';
import { ProductCardComponent } from './componenets/product-card/product-card';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../core/services/product-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FilterSidebarComponent, ProductCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
 protected productService = inject(ProductService);
}
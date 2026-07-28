import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSidebarComponent } from './componenets/filter-sidebar/filter-sidebar';
import { ProductCardComponent } from './componenets/product-card/product-card';
import { ProductService } from '../../core/services/product-service';
import { HeaderComponent } from "../../layout/header-component/header-component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FilterSidebarComponent, ProductCardComponent, HeaderComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
 protected productService = inject(ProductService);
}
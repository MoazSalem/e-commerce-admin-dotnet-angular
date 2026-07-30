import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSidebarComponent } from './componenets/filter-sidebar/filter-sidebar';
import { ProductCardComponent } from './componenets/product-card/product-card';
import { HeaderComponent } from "../../layout/header-component/header-component";
import { ShopFacade } from '../../core/services/shop-facade';
import { PaginationComponent } from "../../shared/components/pagination-component/pagination-component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FilterSidebarComponent, ProductCardComponent, HeaderComponent, PaginationComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  protected readonly Math = Math;
  protected shopfacade = inject(ShopFacade);
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header-component/header-component';
import { FilterSidebarComponent } from './componenets/filter-sidebar/filter-sidebar';
import { ProductCardComponent } from './componenets/product-card/product-card';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FilterSidebarComponent, ProductCardComponent],
  templateUrl: './home.html'
})
export class HomeComponent {
 products: Product[] = [
    {
      id: 1,
      categoryId: 101,
      sku: 'ELC-AUR-V2',
      name: 'Aura Wireless V2',
      price: 249.00,
      category: { id: 101, title: 'Electronics' }
    },
    {
      id: 2,
      categoryId: 102,
      sku: 'ACC-APX-CH',
      name: 'Apex Chrono G...',
      price: 360.00,
      category: { id: 102, title: 'Accessories' }
    },
    {
      id: 3,
      categoryId: 103,
      sku: 'BAG-HER-LE',
      name: 'Heritage Leath...',
      price: 189.00,
      category: { id: 103, title: 'Bags' }
    },
    {
      id: 4,
      categoryId: 104,
      sku: 'HOM-BRE-PR',
      name: 'Breville Pro Esp...',
      price: 799.00,
      category: { id: 104, title: 'Home & Living' }
    },
    {
      id: 5,
      categoryId: 105,
      sku: 'FTW-TER-FL',
      name: 'Terra Flow Knit',
      price: 125.00,
      category: { id: 105, title: 'Footwear' }
    },
    {
      id: 6,
      categoryId: 106,
      sku: 'SMH-ECO-HB',
      name: 'EcoSmart Hub',
      price: 199.00,
      category: { id: 106, title: 'Smart Home' }
    }
  ];
}
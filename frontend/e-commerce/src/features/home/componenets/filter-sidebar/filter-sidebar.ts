import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopFacade } from '../../../../core/services/shop-facade';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.css',
})
export class FilterSidebarComponent {
  public facade = inject(ShopFacade);
}
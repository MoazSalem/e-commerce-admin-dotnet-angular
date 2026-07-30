import { Component, inject, signal } from '@angular/core';
import { PaginationComponent } from "../../../../shared/components/pagination-component/pagination-component";
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../../../core/services/product-service';

@Component({
  selector: 'app-inventory-component',
  imports: [PaginationComponent, CurrencyPipe],
  templateUrl: './inventory-component.html',
})
export class InventoryComponent {
  protected productService = inject(ProductService);
  protected readonly Math = Math; 
}

import { Component, computed, input, output } from '@angular/core';
import { PaginatedResult } from '../../models/pagination';

@Component({
  selector: 'app-pagination-component',
  imports: [],
  templateUrl: './pagination-component.html',
  styleUrl: './pagination-component.css',
})
export class PaginationComponent {
  public metadata = input.required<PaginatedResult<any>>();
  
  // Emits the new page number when a user clicks a button
  public pageChange = output<number>();

  // Automatically calculates the pages array 
  public visiblePages = computed(() => {
    const current = this.metadata().pageNumber;
    const total = this.metadata().totalPages;
    
    // If 5 or fewer pages, just show all of them
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    
    // If we are near the beginning
    if (current <= 3) {
      return [1, 2, 3, 4, '...', total];
    }
    
    // If we are near the end
    if (current >= total - 2) {
      return [1, '...', total - 3, total - 2, total - 1, total];
    }
    
    // If we are somewhere in the middle
    return [1, '...', current - 1, current, current + 1, '...', total];
  });

  public onPrev(): void {
    if (this.metadata().hasPreviousPage) {
      this.pageChange.emit(this.metadata().pageNumber - 1);
    }
  }

  public onNext(): void {
    if (this.metadata().hasNextPage) {
      this.pageChange.emit(this.metadata().pageNumber + 1);
    }
  }

  public onPageClick(page: string | number): void {
    if (typeof page === 'number' && page !== this.metadata().pageNumber) {
      this.pageChange.emit(page);
    }
  }
}

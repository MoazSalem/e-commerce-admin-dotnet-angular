import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../../shared/models/product';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginatedResult } from '../../shared/models/pagination';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public pageNumber = signal(1);
  public pageSize = signal(6);
  public categoryIds = signal<number[]>([]);
  public sort = signal<string | null>(null);

  public readonly productsResource = rxResource({
    params: () => ({
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
      categoryIds: this.categoryIds(),
      sort: this.sort()
    }),

    stream: ({ params }) => {
      let httpParams = new HttpParams()
        .set('pageNumber', params.pageNumber)
        .set('pageSize', params.pageSize);

      if (params.categoryIds && params.categoryIds.length > 0) {
        params.categoryIds.forEach(id => {
        httpParams = httpParams.append('categoryIds', id);
        })
      }

      if (params.sort) {
        httpParams = httpParams.set('sort', params.sort);
      }

      return this.http.get<PaginatedResult<Product>>(`${this.apiUrl}Products`, { params: httpParams });
    }
  });

  public reloadProducts(): void {
    this.productsResource.reload();
  }

  public changePage(newPage: number) {
    this.pageNumber.set(newPage);
  }

   public toggleCategory(categoryId: number) {
    this.pageNumber.set(1); // Reset to page 1 when filtering
    
    this.categoryIds.update(ids => {
      // If it's already selected, remove it. Otherwise, add it.
      if (ids.includes(categoryId)) {
        return ids.filter(id => id !== categoryId);
      } else {
        return [...ids, categoryId];
      }
    });
  }

  public clearCategories() {
    this.pageNumber.set(1);
    this.categoryIds.set([]); // Reset to empty array
  }

  public changeSort(sort: string) {
    this.pageNumber.set(1); // Reset to page 1 when sorting
    this.sort.set(sort);
  }

}

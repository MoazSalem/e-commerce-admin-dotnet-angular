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

  public readonly productsResource = rxResource({
    params: () => ({
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize()
    }),
    
    stream: ({ params }) => {
      const httpParams = new HttpParams()
        .set('pageNumber', params.pageNumber)
        .set('pageSize', params.pageSize);

      return this.http.get<PaginatedResult<Product>>(`${this.apiUrl}Products`, { params: httpParams });
    }
  });

public reloadProducts(): void {
    this.productsResource.reload();
  }

  public changePage(newPage: number) {
    this.pageNumber.set(newPage);
  }
  
}

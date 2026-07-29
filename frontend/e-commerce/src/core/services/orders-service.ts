import { inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Order } from '../../shared/models/cartItem';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { PaginatedResult } from '../../shared/models/pagination';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;


  public pageNumber = signal(1);
  public pageSize = signal(6);

  public readonly pastOrdersResource = rxResource({
    params: () => ({
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize()
    }),

    stream: ({ params }) => {
      const httpParams = new HttpParams()
        .set('pageNumber', params.pageNumber)
        .set('pageSize', params.pageSize);

      return this.http.get<PaginatedResult<Order>>(`${this.apiUrl}Orders/my-orders`, { params: httpParams });
    }
  });

  public changePage(newPage: number) {
    this.pageNumber.set(newPage);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment.development';
import { DashboardMetrics, RecentOrder } from '../../shared/models/dashboard';
import { PaginatedResult } from '../../shared/models/pagination';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
    private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  // Resource for the Top 4 Stat Cards
  public readonly statsResource = rxResource({
    stream: () => this.http.get<DashboardMetrics>(`${this.apiUrl}Dashboard/stats`)
  });

  // Resource for the Recent Orders Table
  public readonly recentOrdersResource = rxResource({
    stream: () => this.http.get<RecentOrder[]>(`${this.apiUrl}Dashboard/recent-orders`)
  });

  public pageNumber = signal(1);
  public pageSize = signal(10);

  // Full Paginated Orders Resource
  public readonly paginatedOrdersResource = rxResource({
    params: () => ({
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
    }),
    stream: ({ params }) => {
      let httpParams = new HttpParams()
        .set('pageNumber', params.pageNumber)
        .set('pageSize', params.pageSize);

      return this.http.get<PaginatedResult<RecentOrder>>(`${this.apiUrl}Dashboard/orders`, { params:httpParams });
    }
  });

  public changePage(newPage: number) {
    this.pageNumber.set(newPage);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment.development';
import { DashboardMetrics, RecentOrder } from '../../shared/models/dashboard';

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
}

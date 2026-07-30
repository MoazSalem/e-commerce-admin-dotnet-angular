export interface DashboardMetrics {
  totalSales: number;
  salesTrend: number;
  newOrders: number;
  ordersTrend: number;
  activeUsers: number;
  usersTrend: number;
  netRevenue: number;
  revenueTrendStatus: string;
}

export interface RecentOrder {
  id: string;
  customerName: string;
  createdAt: string;
  total: number;
}
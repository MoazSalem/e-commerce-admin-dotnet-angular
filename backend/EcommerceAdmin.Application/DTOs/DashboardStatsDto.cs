namespace EcommerceAdmin.Application.DTOs;

public class DashboardStatsDto
{
    public decimal TotalSales { get; set; }
    public double SalesTrend { get; set; } 

    public int NewOrders { get; set; }
    public int OrdersTrend { get; set; } 

    public int ActiveUsers { get; set; }
    public double UsersTrend { get; set; } 

    public decimal NetRevenue { get; set; }
    public string RevenueTrendStatus { get; set; } = string.Empty; 
}

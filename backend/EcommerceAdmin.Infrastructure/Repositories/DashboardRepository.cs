using EcommerceAdmin.Application.DTOs;
using EcommerceAdmin.Application.Interfaces;
using EcommerceAdmin.Domain.Entities;
using EcommerceAdmin.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAdmin.Infrastructure.Repositories;

public class DashboardRepository(AppDbContext context) : IDashboardRepository
{
    public async Task<DashboardStatsDto> GetStatsAsync()
    {
         var now = DateTime.UtcNow;
        var thirtyDaysAgo = now.AddDays(-30);
        var sixtyDaysAgo = now.AddDays(-60);

        var currentOrders = await context.Orders
            .Where(o => o.CreatedAt >= thirtyDaysAgo)
            .ToListAsync();

        var previousOrders = await context.Orders
            .Where(o => o.CreatedAt >= sixtyDaysAgo && o.CreatedAt < thirtyDaysAgo)
            .ToListAsync();

        var currentSales = currentOrders.Sum(o => o.Total);
        var previousSales = previousOrders.Sum(o => o.Total);

        var salesTrend = previousSales == 0 
            ? 100.0 
            : (double)((currentSales - previousSales) / previousSales) * 100;

        var ordersTrend = currentOrders.Count - previousOrders.Count;

        var totalUsers = await context.Users.CountAsync();
        
        // Simulating Net Revenue as 80% of Total Sales (assuming 20% costs/taxes)
        var netRevenue = currentSales * 0.80m;
        var previousNetRevenue = previousSales * 0.80m;
        
        string revenueStatus = "stable";
        if (netRevenue > previousNetRevenue * 1.05m) revenueStatus = "up";
        if (netRevenue < previousNetRevenue * 0.95m) revenueStatus = "down";

        return new DashboardStatsDto
        {
            TotalSales = currentSales,
            SalesTrend = Math.Round(salesTrend, 1),
            
            NewOrders = currentOrders.Count,
            OrdersTrend = ordersTrend,
            
            ActiveUsers = totalUsers,
            // Assuming 2.1% drop as a placeholder for the UI mockup
            UsersTrend = -2.1, 
            
            NetRevenue = netRevenue,
            RevenueTrendStatus = revenueStatus
        };
    }

    public async Task<IEnumerable<RecentOrderDto>> GetRecentOrdersAsync(int count = 5)
    {
        var query = from order in context.Orders
                    join user in context.Set<User>() on order.UserId equals user.Id
                    orderby order.CreatedAt descending
                    select new RecentOrderDto
                    {
                        Id = order.Id,
                        // Fallback to UserName (usually email) just in case Name is empty
                        CustomerName = user.Name ?? user.UserName ?? "Unknown Customer", 
                        CreatedAt = order.CreatedAt,
                        Total = order.Total
                    };

        return await query.Take(count).ToListAsync();
    }

    public async Task<(IEnumerable<RecentOrderDto> Items, int TotalCount)> GetPaginatedOrdersAsync(int pageNumber, int pageSize)
    {
        var query = from order in context.Orders
                    join user in context.Set<User>() on order.UserId equals user.Id
                    orderby order.CreatedAt descending
                    select new RecentOrderDto
                    {
                        Id = order.Id,
                        CustomerName = user.Name ?? user.UserName ?? "Unknown Customer",
                        CreatedAt = order.CreatedAt,
                        Total = order.Total
                    };

        var totalCount = await query.CountAsync();

        // Grab just the page we need
        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

}

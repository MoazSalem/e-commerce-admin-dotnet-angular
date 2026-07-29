using EcommerceAdmin.Application.Interfaces;
using EcommerceAdmin.Domain.Entities;
using EcommerceAdmin.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAdmin.Infrastructure.Repositories;

public class OrderRepository(AppDbContext context) : IOrderRepository
{
    public async Task<Order> CreateOrderAsync(Order order)
    {
        context.Orders.Add(order);
        await context.SaveChangesAsync();
        return order;
    }

    public async Task<IEnumerable<Order>> GetAllOrdersAsync()
    {
        return await context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Product)
        .Include(o => o.User).OrderByDescending(o => o.CreatedAt).ToListAsync();
    }

    public async Task<IEnumerable<Order>> GetByUserIdAsync(string userId)
    {
        return await context.Orders
        .Include(o => o.OrderItems).ThenInclude(oi => oi.Product)
        .Where(o => o.UserId == userId)
        .OrderByDescending(o => o.CreatedAt)
        .ToListAsync();
    }

    public async Task<(IEnumerable<Order> Items, int TotalCount)> GetByUserIdPaginatedAsync(string userId, int pageNumber, int pageSize)
    {
        var query = context.Orders
            .Include(o => o.OrderItems).ThenInclude(oi => oi.Product)
            .Where(o => o.UserId == userId)
            .AsNoTracking();

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(o => o.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task<Order?> GetOrderByIdAsync(int id)
    {
        return await context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Product)
        .Include(o => o.User).FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId)
    {
        return await context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Product)
        .Where(o => o.User.Id == userId).ToListAsync();
    }

}

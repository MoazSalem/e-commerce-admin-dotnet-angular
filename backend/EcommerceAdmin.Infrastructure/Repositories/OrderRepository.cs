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

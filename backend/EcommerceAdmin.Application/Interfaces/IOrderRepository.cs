using EcommerceAdmin.Domain.Entities;

namespace EcommerceAdmin.Application.Interfaces;

public interface IOrderRepository
{
    Task<IEnumerable<Order>> GetAllOrdersAsync();
    Task<Order?> GetOrderByIdAsync(int id);
    Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);
    Task<Order> CreateOrderAsync(Order order);
}

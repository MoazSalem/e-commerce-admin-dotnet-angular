using EcommerceAdmin.Domain.Entities;

namespace EcommerceAdmin.Application.Interfaces;

public interface IOrderRepository
{
    Task<IEnumerable<Order>> GetAllOrdersAsync();
    Task<Order?> GetOrderByIdAsync(int id);
    Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);
    Task<Order> CreateOrderAsync(Order order);

    Task<IEnumerable<Order>> GetByUserIdAsync(string userId);
    Task<(IEnumerable<Order> Items, int TotalCount)> GetByUserIdPaginatedAsync(string userId, int pageNumber, int pageSize);
}

using EcommerceAdmin.Application.DTOs;
using EcommerceAdmin.Application.Interfaces;
using EcommerceAdmin.Domain.Entities;

namespace EcommerceAdmin.Application.Services;

public class OrderService(IOrderRepository orderRepository, IProductRepository productRepository) : IOrderService
{
    public async Task<Order> CreateOrderAsync(string userId, CreateOrderDto dto)
    {
         var newOrder = new Order
        {
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            Total = 0,
            OrderItems = []
        };

        foreach (var item in dto.Items)
        {
            // verify the product exists
            var product = await productRepository.GetByIdAsync(item.ProductId);

            if (product == null)
            {
                throw new Exception($"Product ID {item.ProductId} does not exist."); 
            }

            var orderItem = new OrderItem
            {
                ProductId = product.Id,
                Quantity = item.Quantity,
                // use price from database for safety
                UnitPrice = product.Price
            };

            newOrder.Total += (orderItem.Quantity * orderItem.UnitPrice);
            newOrder.OrderItems.Add(orderItem);

        }

        return await orderRepository.CreateOrderAsync(newOrder);
    }

}

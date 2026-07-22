using EcommerceAdmin.Application.DTOs;
using EcommerceAdmin.Domain.Entities;

namespace EcommerceAdmin.Application.Interfaces;

public interface IOrderService
{
    Task<Order> CreateOrderAsync(string userId, CreateOrderDto dto);
}

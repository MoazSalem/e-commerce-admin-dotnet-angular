using EcommerceAdmin.Application.DTOs;
using EcommerceAdmin.Application.DTOs.Orders;
using EcommerceAdmin.Domain.Entities;

namespace EcommerceAdmin.Application.Common.Mappings;

public static class MappingExtensions
{
    // --- Product Mapping ---
    public static ProductResponseDto ToDto(this Product product)
    {
        return new ProductResponseDto
        {
            Id = product.Id,
            SKU = product.SKU,
            Name = product.Name,
            Price = product.Price,
            CategoryId = product.CategoryId,
            CategoryName = product.Category?.Title ?? "Unknown"
        };
    }

    // --- Category Mapping ---
    public static CategoryResponseDto ToDto(this Category category)
    {
        return new CategoryResponseDto
        {
            Id = category.Id,
            Title = category.Title,
            Description = category.Description
        };
    }

    // --- Order Item Mapping ---
    public static OrderItemResponseDto ToDto(this OrderItem orderItem)
    {
        return new OrderItemResponseDto
        {
            Id = orderItem.Id,
            Name = orderItem.Product.Name,
            ProductId = orderItem.ProductId,
            Quantity = orderItem.Quantity,
            UnitPrice = orderItem.UnitPrice
        };
    }

    // --- Order Mapping ---
    public static OrderResponseDto ToDto(this Order order)
    {
        return new OrderResponseDto
        {
            Id = order.Id,
            UserId = order.UserId,
            Total = order.Total,
            CreatedAt = order.CreatedAt,
            // Recursively use the OrderItem extension method!
            Items = order.OrderItems?.Select(oi => oi.ToDto()).ToList() ?? new List<OrderItemResponseDto>()
        };
    }
}
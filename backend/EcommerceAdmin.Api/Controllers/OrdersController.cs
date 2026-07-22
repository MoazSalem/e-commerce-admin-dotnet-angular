using System.Security.Claims;
using EcommerceAdmin.Application.DTOs;
using EcommerceAdmin.Application.Interfaces;
using EcommerceAdmin.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAdmin.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController(IOrderRepository orderRepository, IProductRepository productRepository) : ControllerBase
{
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllOrders()
    {
        return Ok(await orderRepository.GetAllOrdersAsync());
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetOrderById(int id)
    {
        var order = await orderRepository.GetOrderByIdAsync(id);

        if (order == null) return NotFound();

        // security check, if not admin and orders user id doesn't match current user id, forbid it 
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!User.IsInRole("Admin") && order.UserId != currentUserId)
        {
            return Forbid();
        }

        return Ok(order);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

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
                return BadRequest(new { Message = $"Product ID {item.ProductId} does not exist." });
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

        var createdOrder = await orderRepository.CreateOrderAsync(newOrder);

        return CreatedAtAction(nameof(GetOrderById), new { id = createdOrder.Id }, createdOrder);

    }
}

using System.Security.Claims;
using EcommerceAdmin.Application.DTOs.Orders;
using EcommerceAdmin.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAdmin.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController(IOrderRepository orderRepository, IOrderService orderService) : ControllerBase
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

    [HttpGet("my-orders")]
    [Authorize]
    public async Task<IActionResult> GetMyOrders()
    {
        // Get the User ID securely from the token the user sent
        var currentUserId = User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier) ?? 
                            User.FindFirstValue(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub);

        if (string.IsNullOrEmpty(currentUserId))
            return Unauthorized();

        var orders = await orderRepository.GetByUserIdAsync(currentUserId);

        var response = orders.Select(o => new OrderResponseDto
        {
            Id = o.Id,
            UserId = o.UserId,
            Total = o.Total,
            CreatedAt = o.CreatedAt,
            Items = [.. o.OrderItems.Select(oi => new OrderItemResponseDto
            {
                Id = oi.Id,
                Name = oi.Product.Name,
                ProductId = oi.ProductId,
                Quantity = oi.Quantity,
                UnitPrice = oi.UnitPrice
            })]
        }).ToList();

        return Ok(response);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        try
        {
            var createdOrder = await orderService.CreateOrderAsync(userId, dto);

            var response = new OrderResponseDto
            {
                Id = createdOrder.Id,
                UserId = createdOrder.UserId,
                Total = createdOrder.Total,
                CreatedAt = createdOrder.CreatedAt,
                Items = [.. createdOrder.OrderItems.Select(oi => new OrderItemResponseDto
                {
                    Id = oi.Id,
                    Name = oi.Product.Name,
                    ProductId = oi.ProductId,
                    Quantity = oi.Quantity,
                    UnitPrice = oi.UnitPrice
                })]
            };

            return CreatedAtAction(nameof(GetOrderById), new { id = createdOrder.Id }, response);
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = ex.Message });
        }

    }
}

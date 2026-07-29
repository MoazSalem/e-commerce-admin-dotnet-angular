using System.Security.Claims;
using EcommerceAdmin.Application.DTOs;
using EcommerceAdmin.Application.DTOs.Orders;
using EcommerceAdmin.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EcommerceAdmin.Application.Common.Mappings;

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

        var response = order.ToDto();

        return Ok(response);
    }

    [HttpGet("my-orders")]
    [Authorize]
    public async Task<IActionResult> GetMyOrders([FromQuery] PaginationParams paginationParams)
    {
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? 
                            User.FindFirstValue(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub);

        if (string.IsNullOrEmpty(currentUserId))
            return Unauthorized();

        // Fetch paginated orders and total count from the repository
        var (orders, totalCount) = await orderRepository.GetByUserIdPaginatedAsync(
            currentUserId, 
            paginationParams.PageNumber, 
            paginationParams.PageSize);

        var orderDtos = orders.Select(o => o.ToDto()).ToList();

        // Wrap everything in the generic PagedResult
        var response = new PagedResult<OrderResponseDto>(
            orderDtos, 
            totalCount, 
            paginationParams.PageNumber, 
            paginationParams.PageSize);

        return Ok(response);
    }

    [HttpGet("my-orders/all")]
    [Authorize]
    public async Task<IActionResult> GetMyOrders()
    {
        // Get the User ID securely from the token the user sent
        var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? 
                            User.FindFirstValue(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub);

        if (string.IsNullOrEmpty(currentUserId))
            return Unauthorized();

        var orders = await orderRepository.GetByUserIdAsync(currentUserId);

        var orderDtos = orders.Select(o => o.ToDto()).ToList();

        return Ok(orderDtos);
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

            var response = createdOrder.ToDto();

            return CreatedAtAction(nameof(GetOrderById), new { id = createdOrder.Id }, response);
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = ex.Message });
        }

    }
}

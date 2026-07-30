using EcommerceAdmin.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAdmin.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class DashboardController(IDashboardRepository dashboardRepository) : ControllerBase
{

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var stats = await dashboardRepository.GetStatsAsync();
        return Ok(stats);
    }

    [HttpGet("recent-orders")]
    public async Task<IActionResult> GetRecentOrders()
    {
        var recentOrders = await dashboardRepository.GetRecentOrdersAsync(5);
        return Ok(recentOrders);
    }
}

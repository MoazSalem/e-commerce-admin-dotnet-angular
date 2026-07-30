using EcommerceAdmin.Application.DTOs;

namespace EcommerceAdmin.Application.Interfaces;

public interface IDashboardRepository
{
    Task<DashboardStatsDto> GetStatsAsync();

    Task<IEnumerable<RecentOrderDto>> GetRecentOrdersAsync(int count = 5);
}

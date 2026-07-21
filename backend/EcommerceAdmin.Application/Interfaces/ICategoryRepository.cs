using EcommerceAdmin.Domain.Entities;

namespace EcommerceAdmin.Application.Interfaces;

public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetAllAsync();
    Task<Category?> GetByIdAsync(int id);
    Task<Category> AddAsync(Category category);
    Task<bool> ExistsAsync(int id);
}

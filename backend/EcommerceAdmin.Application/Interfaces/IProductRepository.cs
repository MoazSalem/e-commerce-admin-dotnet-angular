using EcommerceAdmin.Application.DTOs;
using EcommerceAdmin.Domain.Entities;

namespace EcommerceAdmin.Application.Interfaces;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllAsync();
    Task<(IEnumerable<Product> Items, int TotalCount)> GetAllPaginatedAsync(ProductParams productParams);
    Task<Product?> GetByIdAsync(int id);
    Task<Product> AddAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(int id);
}

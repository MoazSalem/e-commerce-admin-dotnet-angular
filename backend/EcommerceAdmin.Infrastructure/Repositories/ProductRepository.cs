using EcommerceAdmin.Application.DTOs;
using EcommerceAdmin.Application.Interfaces;
using EcommerceAdmin.Domain.Entities;
using EcommerceAdmin.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAdmin.Infrastructure.Repositories;

public class ProductRepository(AppDbContext context) : IProductRepository
{
    public async Task<Product> AddAsync(Product product)
    {
        context.Products.Add(product);
        if (await context.SaveChangesAsync() > 0) return product;
        else throw new Exception("couldn't add Product");
    }

    public async Task DeleteAsync(int id)
    {
        var product = await context.Products.FindAsync(id);
        if (product != null)
        {
            context.Products.Remove(product);
            await context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Product>> GetAllAsync()
    {
        return await context.Products.Include(p => p.Category).ToListAsync();
    }

        public async Task<(IEnumerable<Product> Items, int TotalCount)> GetAllPaginatedAsync(ProductParams productParams)
    {
        var query = context.Products.Include(p => p.Category).AsQueryable();

        // Apply Filtering
        if (productParams.CategoryIds != null && productParams.CategoryIds.Count != 0)
        {
            query = query.Where(p => productParams.CategoryIds.Contains(p.CategoryId));
        }
        
        // Apply Sorting
        query = productParams.Sort switch
        {
            "priceAsc" => query.OrderBy(p => p.Price),
            "priceDesc" => query.OrderByDescending(p => p.Price),
            "nameDesc" => query.OrderByDescending(p => p.Name),
            _ => query.OrderBy(p => p.Name) // Default sort (alphabetical by name)
        };

        var totalCount = await query.CountAsync();

        var items = await query
            .Skip((productParams.PageNumber - 1) * productParams.PageSize)
            .Take(productParams.PageSize)
            .AsNoTracking()
            .ToListAsync();

        return (items, totalCount);
    }


    public async Task<Product?> GetByIdAsync(int id)
    {
        return await context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task UpdateAsync(Product product)
    {
        context.Products.Update(product);
        await context.SaveChangesAsync();
    }

}

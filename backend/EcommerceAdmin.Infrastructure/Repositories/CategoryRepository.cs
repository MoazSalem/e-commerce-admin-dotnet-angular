using EcommerceAdmin.Application.Interfaces;
using EcommerceAdmin.Domain.Entities;
using EcommerceAdmin.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAdmin.Infrastructure.Repositories;

public class CategoryRepository(AppDbContext context) : ICategoryRepository
{
    public async Task<Category> AddAsync(Category category)
    {
        context.Categories.Add(category);
        if (await context.SaveChangesAsync() > 0) return category;
        else throw new Exception("couldn't add category");
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await context.Categories.FindAsync(id) != null;
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await context.Categories.AsNoTracking().ToListAsync();
    }

    public async Task<Category?> GetByIdAsync(int id)
    {
        return await context.Categories.FindAsync(id);
    }

}

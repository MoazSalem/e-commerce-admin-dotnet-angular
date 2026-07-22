using EcommerceAdmin.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace EcommerceAdmin.Infrastructure.Persistence;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        // Apply any pending migrations automatically
        await context.Database.MigrateAsync();

        // Seed Roles
        var roles = new[] { "Admin", "Customer" };
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }

        // Seed the Default Admin User
        var adminEmail = "admin@ecommerce.com";
        if (await userManager.FindByEmailAsync(adminEmail) == null)
        {
            var adminUser = new User
            {
                UserName = adminEmail,
                Email = adminEmail,
                Name = "System Administrator",
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(adminUser, "Admin123!");
            
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
            else
            {
                throw new Exception($"Failed to create admin user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
            }
        }

        // Seed Categories
        if (!await context.Categories.AnyAsync())
        {
            var categories = new List<Category>
            {
                new() { Title = "Electronics", Description = "Gadgets and tech" },
                new() { Title = "Clothing", Description = "Apparel and accessories" },
                new() { Title = "Home & Garden", Description = "Furniture and decor" }
            };

            await context.Categories.AddRangeAsync(categories);
            await context.SaveChangesAsync();
        }

        // Seed Products
        if (!await context.Products.AnyAsync())
        {
            // We need to fetch the categories we just created to get their IDs
            var electronics = await context.Categories.FirstOrDefaultAsync(c => c.Title == "Electronics");
            var clothing = await context.Categories.FirstOrDefaultAsync(c => c.Title == "Clothing");

            if (electronics != null && clothing != null)
            {
                var products = new List<Product>
                {
                    new() { CategoryId = electronics.Id, Name = "Wireless Headphones", SKU = "TECH-001", Price = 99.99m },
                    new() { CategoryId = electronics.Id, Name = "Smartwatch", SKU = "TECH-002", Price = 199.50m },
                    new() { CategoryId = clothing.Id, Name = "Cotton T-Shirt", SKU = "CLO-001", Price = 19.99m }
                };

                await context.Products.AddRangeAsync(products);
                await context.SaveChangesAsync();
            }
        }
    }
}
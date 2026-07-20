namespace EcommerceAdmin.Domain.Entities;

public class Category
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }

    // Navigation property
    public ICollection<Product> Products { get; set; } = [];
}

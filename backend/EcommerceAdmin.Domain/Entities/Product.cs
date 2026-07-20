namespace EcommerceAdmin.Domain.Entities;

public class Product
{
    public int Id { get; set; }
    public int CategoryId { get; set; }

    public required string SKU { get; set; }

    public required string Name {get; set; }

    public decimal Price { get; set; }

    // Navigation property
    public Category Category { get; set; } = null!;
}

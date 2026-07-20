namespace EcommerceAdmin.Domain.Entities;

public class Order
{
    public int Id { get; set; }
    public required string UserId { get; set; }
    public decimal Total { get; set; }

    public DateTime CreatedAt { get; set; }

    // Navigation property
    public ICollection<OrderItem> OrderItems { get; set; } = [];

    public User User { get; set; } = null!;

}

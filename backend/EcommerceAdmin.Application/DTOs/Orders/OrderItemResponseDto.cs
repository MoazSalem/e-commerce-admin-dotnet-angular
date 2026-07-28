namespace EcommerceAdmin.Application.DTOs.Orders;

public class OrderItemResponseDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}
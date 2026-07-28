namespace EcommerceAdmin.Application.DTOs.Orders;

public class OrderResponseDto
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public decimal Total { get; set; }
    public DateTime CreatedAt { get; set; }
    
    public List<OrderItemResponseDto> Items { get; set; } = []; 
}
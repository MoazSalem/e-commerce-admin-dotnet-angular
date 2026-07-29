namespace EcommerceAdmin.Application.DTOs;

public class ProductParams : PaginationParams
{
    public List<int> CategoryIds { get; set; } = [];
    
    public string? Sort { get; set; }
}

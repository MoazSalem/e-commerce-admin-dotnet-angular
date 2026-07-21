using System.ComponentModel.DataAnnotations;

namespace EcommerceAdmin.Application.DTOs;

public class CreateProductDto
{
    [Required]
    public required string SKU { get; set; }

    [Required]
    [MaxLength(100)]
    public required string Name { get; set; }

    [Required]
    [Range(0.01, 1000000.00, ErrorMessage = "Price must be greater than zero.")]
    public decimal Price { get; set; }

    [Required]
    public int CategoryId { get; set; }
}

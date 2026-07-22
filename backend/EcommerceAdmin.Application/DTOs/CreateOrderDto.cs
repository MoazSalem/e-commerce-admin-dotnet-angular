using System.ComponentModel.DataAnnotations;

namespace EcommerceAdmin.Application.DTOs;

public class CreateOrderDto
{
    [Required]
    [MinLength(1, ErrorMessage = "An order must contain at least one item.")]
    public required List<CreateOrderItemDto> Items { get; set; }
}

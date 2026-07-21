using System.ComponentModel.DataAnnotations;

namespace EcommerceAdmin.Application.DTOs;

public class CreateCategoryDto
{
    [Required]
    [MaxLength(100)]
    public required string Title { get; set; }

    [Required]
    [MaxLength(500)]
    public required string Description { get; set; }
}
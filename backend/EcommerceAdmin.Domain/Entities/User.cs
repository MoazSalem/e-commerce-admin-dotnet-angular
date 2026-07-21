using Microsoft.AspNetCore.Identity;

namespace EcommerceAdmin.Domain.Entities;

public class User : IdentityUser
{
    public required string Name { get; set; }
    
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }

    // Navigation property
    public ICollection<Order> Orders { get; set; } = [];
}

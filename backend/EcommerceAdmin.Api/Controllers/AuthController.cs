using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EcommerceAdmin.Application.DTOs.Auth;
using EcommerceAdmin.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace EcommerceAdmin.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(UserManager<User> userManager, IConfiguration configuration) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var existingUser = await userManager.FindByEmailAsync(request.Email);
        if (existingUser != null)
        {
            return BadRequest(new { Message = "Email is already in use." });
        }

        var newUser = new User
        {
            Email = request.Email,
            UserName = request.Email, // required by identity
            Name = request.Name,
        };

        var result = await userManager.CreateAsync(newUser, request.Password);

        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description);
            return BadRequest(new { Errors = errors });
        }

        return Ok(new { Message = "User registered successfully." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            return Unauthorized(new { Message = "Invalid email or password." });
        }

        var isPasswordValid = await userManager.CheckPasswordAsync(user, request.Password);
        if (!isPasswordValid)
        {
            return Unauthorized(new { Message = "Invalid email or password." });
        }

        var token = GenerateJwtToken(user);

        return Ok(new AuthResponse
        {
            Token = token,
            Email = user.Email!,
            Name = user.Name
        });
    }

    private string GenerateJwtToken(User user)
    {
        var jwtSettings = configuration.GetSection("JwtSettings");
        var secretKey = Encoding.UTF8.GetBytes(jwtSettings["Secret"]!);

        // Create the payload
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id),
            new(JwtRegisteredClaimNames.Email, user.Email!),
            new("name", user.Name),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        // Create the token signature
        var key = new SymmetricSecurityKey(secretKey);
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["ExpiryInMinutes"]!)),
            Issuer = jwtSettings["Issuer"],
            Audience = jwtSettings["Audience"],
            SigningCredentials = credentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}

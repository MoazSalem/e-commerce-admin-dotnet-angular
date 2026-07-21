using System.Security.Claims;
using EcommerceAdmin.Application.DTOs.Auth;
using EcommerceAdmin.Application.Interfaces;
using EcommerceAdmin.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAdmin.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(UserManager<User> userManager, ITokenService tokenService) : ControllerBase
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

        await userManager.AddToRoleAsync(newUser, "Customer");

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

        var roles = await userManager.GetRolesAsync(user);

        var token = tokenService.GenerateJwtToken(user, roles);

        var refreshToken = tokenService.GenerateRefreshToken();
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        await userManager.UpdateAsync(user);

        return Ok(new AuthResponse
        {
            Token = token,
            RefreshToken = refreshToken,
            Email = user.Email!,
            Name = user.Name
        });
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequest request)
    {
        // Extract the user principal from the expired JWT
        var principal = tokenService.GetPrincipalFromExpiredToken(request.Token);
        if (principal == null)
        {
            return BadRequest(new { Message = "Invalid access token or refresh token" });
        }

        var email = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        if (email == null)
        {
             return BadRequest(new { Message = "Invalid access token or refresh token" });
        }

        var user = await userManager.FindByEmailAsync(email);
        
        // Validate the Refresh Token against the database
        if (user == null || user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
        {
            return BadRequest(new { Message = "Invalid access token or refresh token" });
        }

        var roles = await userManager.GetRolesAsync(user);

        // Generate new tokens
        var newJwtToken = tokenService.GenerateJwtToken(user, roles);
        var newRefreshToken = tokenService.GenerateRefreshToken();

        // Update the database with the new refresh token
        user.RefreshToken = newRefreshToken;
        await userManager.UpdateAsync(user);

        return Ok(new AuthResponse
        {
            Token = newJwtToken,
            RefreshToken = newRefreshToken,
            Email = user.Email!,
            Name = user.Name
        });
    }
}

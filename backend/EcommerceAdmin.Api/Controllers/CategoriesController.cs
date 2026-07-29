using EcommerceAdmin.Application.Common.Mappings;
using EcommerceAdmin.Application.DTOs;
using EcommerceAdmin.Application.Interfaces;
using EcommerceAdmin.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAdmin.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(ICategoryRepository categoryRepository) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var categories = await categoryRepository.GetAllAsync();
        var response = categories.Select( c => c.ToDto());
        return Ok(response);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(int id)
    {
        var category = await categoryRepository.GetByIdAsync(id);

        if (category == null)
            return NotFound(new { Message = $"Category with Id {id} was not found." });

        var response = category.ToDto();    

        return Ok(response);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Create([FromBody] CreateCategoryDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var newCategory = new Category
        {
            Title = dto.Title,
            Description = dto.Description
        };

        var createdCategory = await categoryRepository.AddAsync(newCategory);
    
        return CreatedAtAction(nameof(GetById), new { id = createdCategory.Id }, createdCategory);
    }

}

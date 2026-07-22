using EcommerceAdmin.Application.DTOs;
using EcommerceAdmin.Application.Interfaces;
using EcommerceAdmin.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAdmin.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IProductRepository productRepository, ICategoryRepository categoryRepository) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var products = await productRepository.GetAllAsync();
        return Ok(products);
    }

    [HttpGet("{id}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await productRepository.GetByIdAsync(id);

        if(product == null) return NotFound("Product not foud");

        return Ok(product);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] CreateProductDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var categoryExists = await categoryRepository.ExistsAsync(dto.CategoryId);
        if (!categoryExists)
        {
            return BadRequest(new { Message = $"Category with ID {dto.CategoryId} does not exist. Please create it first." });
        }

        var newProduct = new Product
        {
            SKU = dto.SKU,
            Name = dto.Name,
            Price = dto.Price,
            CategoryId = dto.CategoryId
        };

        var createdProduct = await productRepository.AddAsync(newProduct);
        
        // Returns 201 Created with the URL to fetch the new product
        return CreatedAtAction(nameof(GetById), new { id = createdProduct.Id }, createdProduct);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(int id, [FromBody] Product product)
    {
        if (id != product.Id)
            return BadRequest(new { Message = "ID mismatch." });

        var existingProduct = await productRepository.GetByIdAsync(id);
        if (existingProduct == null)
            return NotFound();

        // Update the existing product's properties
        existingProduct.Name = product.Name;
        existingProduct.SKU = product.SKU;
        existingProduct.Price = product.Price;
        existingProduct.CategoryId = product.CategoryId;

        await productRepository.UpdateAsync(existingProduct);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await productRepository.GetByIdAsync(id);

        if(product == null) return NotFound();

        await productRepository.DeleteAsync(id);

        return NoContent();
    }
}

import { inject, Injectable } from '@angular/core';
import { CartItem } from '../../shared/models/cartItem';
import { ProductService } from './product-service';
import { CartService } from './cart-service';
import { Product } from '../../shared/models/product';
import { CategoryService } from './category-service';

@Injectable({
  providedIn: 'root'
})
export class ShopFacade {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly categoryService = inject(CategoryService);

  public readonly categoryIds = this.productService.categoryIds;
  public readonly currentSort = this.productService.sort;

  public readonly productsResource = this.productService.productsResource;
  public readonly categoriesResource = this.categoryService.categoriesResource;

  // Expose the actions the component can take
  public reloadProducts(): void {
    this.productService.reloadProducts();
  }

  public changePage(page: number): void {
    this.productService.changePage(page);
  }

  public toggleCategory(categoryId: number): void {
    this.productService.toggleCategory(categoryId);
  }

  public clearCategories(): void {
    this.productService.clearCategories();
  }

  public changeSort(event: Event): void {
    const sortValue = (event.target as HTMLSelectElement).value;
    this.productService.changeSort(sortValue);
  }

  public addToCart(product: Product): void {
    // Check if item is already in cart to increase quantity instead of duplicating
    const existingItem = this.cartService.cartItems().find(item => item.productId === product.id);
    
    if (existingItem) {
      this.cartService.changeQuantity(existingItem.productId);
    } else {
      // Map the Product to a new CartItem
      const newItem: CartItem = {
        productId: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity: 1
      };
      
      this.cartService.addItemToCart(newItem);
    }
  }
}
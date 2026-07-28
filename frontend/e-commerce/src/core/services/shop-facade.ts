import { inject, Injectable } from '@angular/core';
import { CartItem } from '../../shared/models/cartItem';
import { ProductService } from './product-service';
import { CartService } from './cart-service';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopFacade {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  public readonly productsResource = this.productService.productsResource;

  // Expose the actions the component can take
  public reloadProducts(): void {
    this.productService.reloadProducts();
  }

  public addToCart(product: Product): void {
    // Check if item is already in cart to increase quantity instead of duplicating
    const existingItem = this.cartService.cartItems().find(item => item.id === product.id);
    
    if (existingItem) {
      this.cartService.changeQuantity(existingItem.id);
    } else {
      // Map the Product to a new CartItem
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity: 1
      };
      
      this.cartService.addItemToCart(newItem);
    }
  }
}
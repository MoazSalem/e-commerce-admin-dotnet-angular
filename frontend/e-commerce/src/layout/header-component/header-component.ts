import { booleanAttribute, Component, inject, input, signal } from '@angular/core';
import { AuthService } from '../../core/auth/auth-service';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart-service';

@Component({
  selector: 'app-header-component',
  imports: [],
  templateUrl: './header-component.html',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  protected cart = inject(CartService);
  protected user = this.authService.currentUser()!;

  isDropdownOpen = signal(false);
  hideCart = input(false, { transform: booleanAttribute });

  toggleDropdown() {
    this.isDropdownOpen.update(isOpen => !isOpen);
  }

  goToCart() {
    this.router.navigateByUrl('/cart')
  }

  logout() {
    this.authService.logout();
    console.log('Logging out user...');
    this.isDropdownOpen.set(false);
    this.router.navigateByUrl('/');
  }

  getNameForAvatar(fullName: string) {

    const nameParts = fullName.trim().split(/\s+/);

    const firstName = nameParts[0] || "";

    const lastName = nameParts.slice(1).join(' ') || "";

    // Return the result as an object
    return firstName+"+"+lastName;
  }
}

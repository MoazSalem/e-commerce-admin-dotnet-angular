import { booleanAttribute, Component, inject, input, signal } from '@angular/core';
import { AuthService } from '../../core/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [],
  templateUrl: './header-component.html',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  isDropdownOpen = signal(false);
  hideCart = input(false, { transform: booleanAttribute });

  toggleDropdown() {
    console.log(this.router.url === '/cart')
    this.isDropdownOpen.update(isOpen => !isOpen);
  }

  goToCart(){
    this.router.navigateByUrl('/cart')
  }

  logout() {
    this.authService.logout();
    console.log('Logging out user...');
    this.isDropdownOpen.set(false);
    this.router.navigateByUrl('/');
  }
}

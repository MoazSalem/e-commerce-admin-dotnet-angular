import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header-component.html'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  isDropdownOpen = signal(false);

  toggleDropdown() {
    this.isDropdownOpen.update(isOpen => !isOpen);
  }

  logout() {
    this.authService.logout();
    console.log('Logging out user...');
    this.isDropdownOpen.set(false);
    this.router.navigateByUrl('/');
  }
}
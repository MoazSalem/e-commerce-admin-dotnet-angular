import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Already logged in, redirect straight to home/dashboard
    return router.createUrlTree(['/home']);
  }

  // Not logged in, allow them to view the login/register page
  return true;
};

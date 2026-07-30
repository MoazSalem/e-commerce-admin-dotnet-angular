import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // 1. Grab the token from LocalStorage (make sure this matches your token key name!)
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? "{}"); 

  if (!currentUser) {
    // Not logged in at all -> Send to login
    router.navigate(['/login']);
    return false;
  }

  try {

    const isUserAdmin = currentUser.role == "Admin";

    if (isUserAdmin) {
      return true; 
    } else {
      router.navigate(['/home']);
      return false;
    }
  } catch (error) {
    console.error('Failed to get role in AdminGuard', error);
    router.navigate(['/login']);
    return false;
  }
};
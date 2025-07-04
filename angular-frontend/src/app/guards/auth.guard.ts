import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('jwt_token'); 

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

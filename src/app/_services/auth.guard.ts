import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const isUserAuthenticated: CanActivateFn =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const routerService = inject(Router);
    const isLoggedIn = authService.isLoggedIn();

    if (!isLoggedIn) {
      routerService.navigate(['/login']);
      return false;
    }
    return true;
  };

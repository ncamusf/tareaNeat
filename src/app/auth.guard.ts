import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.isAuthenticated();
    
  if (!isAuthenticated) {
    // Si no está autenticado, redirigir al login
    router.navigate(['/login']);
    return false;
  }
  return true;
};
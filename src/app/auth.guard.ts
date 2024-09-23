import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        console.log("No se ha logrado autentificar");
        router.navigate(['/login']);
      } else {
        console.log("Autentificado correctamente");
      }
    })
  );
};
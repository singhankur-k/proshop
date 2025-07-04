// // auth.guard.ts
// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from '../../../admin module/services/auth.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const auth = inject(AuthService);
//   const router = inject(Router);
//   console.log('🛡️ authGuard hit, isAuth=', auth.isAuthenticated(), 'url=', state.url);


//   if (auth.isAuthenticated()) {
//     console.log("isAuthenticated hai bhai")
    
//     return true;
//   }

// console.log("authenticated nahi h")
//   // Not logged in → redirect to login, preserve attempted URL
//   const t=router.createUrlTree(['/login'], {
//     queryParams: { returnUrl: state.url }


//   });

//   console.log("something is wrong",t);
//   return t;
// };

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SearchService } from '../../../services/search-service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(SearchService);
  const router = inject(Router);

  return authService.isAuthenticatedFromServer().pipe(
    map(isAuth => {
      if (isAuth) return true;

      return router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
      });
    }),
    catchError(() =>
      of(router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
      }))
    )
  );
};

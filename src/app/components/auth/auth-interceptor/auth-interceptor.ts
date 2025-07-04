import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const toaster = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401 || err.status === 403) {
       toaster.error("Unauthorized","Failed",)
        // Optional: redirect to login
        router.navigate(['/login']);
      }

      return throwError(() => err);
    })
  );
};
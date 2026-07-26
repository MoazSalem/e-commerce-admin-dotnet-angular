import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth-service';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthResponse } from '../../shared/models/auth';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = environment.apiUrl;
  const authService = inject(AuthService);
  const http = inject(HttpClient);
  const router = inject(Router);
  
  const token = authService.currentToken();

  let clonedRequest = req;

  // Attach the Access Token
  if (token) {
    clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // If it's a 401 and we aren't already trying to hit the refresh/login endpoint...
      if (error.status === 401 && !req.url.includes('/auth/')) {
        const currentToken = authService.currentToken();
        const refreshToken = authService.currentRefreshToken();

        if (currentToken && refreshToken) {
          // Attempt the refresh flow
          return http.post<AuthResponse>(apiUrl +'Auth/refresh', {
            token: currentToken,
            refreshToken: refreshToken
          }).pipe(
            switchMap((response) => {
              // Success! Update the signals via the service
              authService.updateTokens(response.token, response.refreshToken);

              // Clone the ORIGINAL failed request, but with the NEW token
              const retryRequest = req.clone({
                setHeaders: { Authorization: `Bearer ${response.token}` }
              });

              // Send the request again
              return next(retryRequest);
            }),
            catchError((refreshError) => {
              // The refresh token is dead/expired. Force logout.
              authService.logout();
              router.navigate(['/login']); // Redirect to login
              return throwError(() => refreshError);
            })
          );
        } else {
           authService.logout();
        }
      }

      // If it's not a 401, or refresh failed, throw the error normally
      return throwError(() => error);
    })
  );
};

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './components/auth/auth-interceptor/auth-interceptor';

import { provideToastr } from 'ngx-toastr';




export const appConfig: ApplicationConfig = {
  providers: [
      // Required for toast animations
      provideToastr({preventDuplicates: true,}),
      provideAnimations(),
    provideHttpClient(
      withInterceptors([authInterceptor])),
      
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay())
  ],
  
};
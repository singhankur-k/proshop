// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private TOKEN_KEY = '';

//   login(token: string) {
//     localStorage.setItem(this.TOKEN_KEY, token);
//   }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
        return !!localStorage.getItem('auth_token');
      }
      return false;
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface LoginResponse {
  accessToken: string;
  expiresAtUtc: string;
  username: string;
  roles: string[];
}

const API_BASE = 'http://localhost:5080';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Promise<LoginResponse> {
    return firstValueFrom(
      this.http.post<LoginResponse>(
        `${API_BASE}/api/auth/login`,
        { username, password },
        { withCredentials: true } // << necesario para cookie de refresh
      )
    );
  }

  getMe(): Promise<Pick<LoginResponse, 'username' | 'roles'>> {
    return firstValueFrom(
      this.http.get<Pick<LoginResponse, 'username' | 'roles'>>(
        `${API_BASE}/api/auth/me`,
        { withCredentials: true } // << por si usas cookie en rutas protegidas
      )
    );
  }

  getToken(): string | null {
    return localStorage.getItem('mb_access_token');
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const claim = payload['role'] || payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (!claim) return [];
      return Array.isArray(claim) ? claim : [claim];
    } catch {
      return [];
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      return typeof exp === 'number' ? (Date.now() < exp * 1000) : true;
    } catch {
      return false;
    }
  }

  hasAnyRole(required: string[]): boolean {
    const roles = this.getRoles();
    return required.some(r => roles.includes(r));
  }
}

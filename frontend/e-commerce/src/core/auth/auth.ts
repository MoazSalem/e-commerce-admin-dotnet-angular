import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../shared/models/auth';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private readonly currentUserState = signal<AuthResponse | null>(this.loadUserFromStorage());

  public readonly currentUser = computed(() => this.currentUserState());
  public readonly isAuthenticated = computed(() => this.currentUserState() !== null);
  public readonly currentToken = computed(() => this.currentUserState()?.token ?? null);
  public readonly currentRefreshToken = computed(() => this.currentUserState()?.refreshToken ?? null);

  register(credentials: RegisterRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, credentials);
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        // Update storage and signal state
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserState.set(response);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserState.set(null);
  }

  // Internal helper to handle the token refresh response
  updateTokens(token: string, refreshToken: string): void {
    const user = this.currentUserState();
    if (user) {
      const updatedUser = { ...user, token, refreshToken };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      this.currentUserState.set(updatedUser);
    }
  }

  private loadUserFromStorage(): AuthResponse | null {
    const storedUser = localStorage.getItem('currentUser');
    try {
      return storedUser ? JSON.parse(storedUser) as AuthResponse : null;
    } catch {
      return null;
    }
  }
}

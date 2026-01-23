import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.urlApi;
  private currentUser$ = new BehaviorSubject<Usuario | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Login local (email/password). Backend setea cookie httpOnly `authToken`.
   */
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/login`, data);
  }

  /**
   * Trae el usuario autenticado (JWT en cookie) y lo guarda en memoria.
   */
  me(): Observable<Usuario> {
    return this.http
      .get<Usuario>(`${this.apiUrl}/usuarios/me`)
      .pipe(tap((u) => this.currentUser$.next(u)));
  }

  getCurrentUser(): Observable<Usuario | null> {
    return this.currentUser$.asObservable();
  }

  /**
   * Compatibilidad: si todavía no se cargó /usuarios/me, devuelve un objeto vacío
   * para que no exploten componentes que esperan Usuario.
   */
  getUsuario(): Usuario {
    return this.currentUser$.value ?? ({} as Usuario);
  }

  isLoggedIn(): boolean {
    return this.currentUser$.value !== null;
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/usuarios/logout`, {}).subscribe({
      next: () => {},
      error: () => {},
      complete: () => {},
    });

    this.currentUser$.next(null);
    window.location.href = '/login';
  }

  beginGoogleLogin(): void {
    window.location.href = `${this.apiUrl}/auth/google`;
  }
}

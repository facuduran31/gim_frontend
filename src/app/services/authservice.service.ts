import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'environment';

export type Usuario = {
  idUsuario?: number;
  idGimnasio?: number;
  rol?: string;
  email?: string;
  nombre?: string;
  apellido?: string;
  [key: string]: any;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.urlApi;
  private currentUser$ = new BehaviorSubject<Usuario | null>(null);

  constructor(private http: HttpClient) {}

  /** Login local (email/password). El backend setea cookie authToken. */
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/login`, data).pipe(
      tap(() => {
        // No hacemos nada acá: la cookie se setea sola por backend.
        // Luego llamamos /usuarios/me desde el componente o un guard.
      }),
    );
  }

  /** Trae el usuario desde el backend (token en cookie) y lo guarda en memoria. */
  me(): Observable<Usuario> {
    return this.http
      .get<Usuario>(`${this.apiUrl}/usuarios/me`)
      .pipe(tap((u) => this.currentUser$.next(u)));
  }

  /** Observable para componentes/guards */
  getCurrentUser(): Observable<Usuario | null> {
    return this.currentUser$.asObservable();
  }

  /** Acceso sync si lo necesitás */
  getCurrentUserValue(): Usuario | null {
    return this.currentUser$.value;
  }

  // ✅ Compatibilidad con el código existente
  getUsuario(): Usuario {
    // Si aún no se cargó /usuarios/me, devolvemos un objeto vacío
    // para evitar que exploten componentes que esperan Usuario.
    return this.currentUser$.value ?? ({} as Usuario);
  }

  isLoggedIn(): boolean {
    // Logged-in real si ya tenemos usuario en memoria
    return this.currentUser$.value !== null;
  }

  /** Logout: backend borra cookie, front limpia estado y redirige */
  logout(): void {
    // Intentamos avisar al backend, pero aunque falle igual limpiamos.
    this.http.post(`${this.apiUrl}/usuarios/logout`, {}).subscribe({
      next: () => {},
      error: () => {},
      complete: () => {},
    });

    this.currentUser$.next(null);

    // Si tu logout ya navegaba con router, dejalo acá o en el componente
    window.location.href = '/login';
  }

  /** Inicia login con Google: redirige al endpoint OAuth del backend */
  beginGoogleLogin(): void {
    // Ajustá la ruta si en tu backend es distinta
    window.location.href = `${this.apiUrl}/auth/google`;
  }
}

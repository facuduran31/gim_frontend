import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.urlApi

  constructor(private http: HttpClient) {}

  login(credentials: { mail: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/usuarios/login`, credentials).pipe(
      tap((response) => {
        // Guardar el token en localStorage o cookies
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout(): void {
    // Eliminar el token al cerrar sesión
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Verificar si el token existe y no ha expirado
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

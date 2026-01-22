import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pago } from '../models/pago';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  private apiUrl = 'http://localhost:3000/pagos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  getById(idPago: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${idPago}`);
  }

  getBySocioPlan(idSocioPlan: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/socio-plan/${idSocioPlan}`);
  }

  create(pago: Partial<Pago>): Observable<any> {
    return this.http.post(this.apiUrl, pago);
  }

  delete(idPago: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idPago}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pago } from '../models/pago';
import { Observable } from 'rxjs';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  private apiUrl = `${environment.urlApi}/pagos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  getById(idPago: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${idPago}`);
  }

  getByGimnasio(
    idGimnasio: number,
    from?: string,
    to?: string,
  ): Observable<Pago[]> {
    const params: any = {};
    if (from) params.from = from;
    if (to) params.to = to;

    return this.http.get<Pago[]>(`${this.apiUrl}/gimnasio/${idGimnasio}`, {
      params,
      withCredentials: true,
    });
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

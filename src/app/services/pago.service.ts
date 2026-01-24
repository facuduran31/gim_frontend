import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  private urlApi = environment.urlApi + '/pagos';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Pago[]>(`${this.urlApi}`, { withCredentials: true });
  }

  getById(idPago: number) {
    return this.http.get<Pago>(`${this.urlApi}/${idPago}`, {
      withCredentials: true,
    });
  }

  getBySocioPlan(idSocioPlan: number) {
    return this.http.get<Pago[]>(`${this.urlApi}/socio-plan/${idSocioPlan}`, {
      withCredentials: true,
    });
  }

  getBySocio(idSocio: number) {
    return this.http.get<any[]>(`${this.urlApi}/socio/${idSocio}`, {
      withCredentials: true,
    });
  }

  create(payload: any) {
    return this.http.post(`${this.urlApi}`, payload, { withCredentials: true });
  }

  delete(idPago: number) {
    return this.http.delete(`${this.urlApi}/${idPago}`, {
      withCredentials: true,
    });
  }
}

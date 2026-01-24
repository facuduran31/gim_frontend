import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { MetodoPago } from '../models/metodo-pago';

@Injectable({
  providedIn: 'root',
})
export class MetodoPagoService {
  private urlApi = environment.urlApi + '/metodos-pago';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<MetodoPago[]>(`${this.urlApi}`, {
      withCredentials: true,
    });
  }
}

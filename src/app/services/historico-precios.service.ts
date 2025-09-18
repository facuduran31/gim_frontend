import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { Observable, map } from 'rxjs';

export interface HistoricoPrecio {
  idHistoricoPrecios: number;
  idPlan: number;
  precio: number;
  fechaDesde: string;
  fechaHasta?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistoricoPreciosService {

  private urlApi = environment.urlApi + '/historico-precios';

  constructor(private http: HttpClient) { }

  // Obtener todo el histórico de un plan
  getHistoricoByPlan(idPlan: number): Observable<HistoricoPrecio[]> {
    return this.http.get<HistoricoPrecio[]>(`${this.urlApi}/plan/${idPlan}`, { withCredentials: true });
  }

  // Obtener el precio más reciente de un plan
  getPrecioActual(idPlan: number): Observable<number> {
    return this.getHistoricoByPlan(idPlan).pipe(
      map(hist => hist.length > 0 ? hist[0].precio : 0)
    );
  }

  // Crear un histórico de precio
  createHistorico(hist: { idPlan: number, precio: number }): Observable<any> {
    return this.http.post(this.urlApi, hist, { withCredentials: true });
  }

  // Actualizar un histórico
  updateHistorico(hist: HistoricoPrecio): Observable<any> {
    return this.http.put(`${this.urlApi}/${hist.idHistoricoPrecios}`, hist, { withCredentials: true });
  }

  // Eliminar un histórico
  deleteHistorico(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`, { withCredentials: true });
  }
}

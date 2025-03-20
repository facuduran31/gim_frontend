import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { HttpClient } from '@angular/common/http';
import { Plan } from 'src/app/models/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  urlApi = environment.urlApi;

  constructor(private http:HttpClient) { }

  getPlans(){
    return this.http.get<Plan[]>(`${this.urlApi}/planes`, {withCredentials: true});
  }

  getPlanById(id:number){
    return this.http.get<Plan>(`${this.urlApi}/planes/${id}`, {withCredentials: true});
  }

  getPlanesByIdGimnasio(idGimnasio:number){
    return this.http.get<Plan[]>(`${this.urlApi}/planes/gimnasio/${idGimnasio}`, {withCredentials: true});
  }

  createPlan(plan:Plan){
    return this.http.post(`${this.urlApi}/planes`, plan, {withCredentials: true});
  }

  updatePlan(plan:Plan){
    return this.http.put(`${this.urlApi}/planes/${plan.idPlan}`, plan, {withCredentials: true});
  }

  deletePlan(id:number){
    return this.http.delete(`${this.urlApi}/planes/${id}`, {withCredentials: true});
  }
}

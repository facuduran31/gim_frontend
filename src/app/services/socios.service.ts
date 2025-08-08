import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socio } from '../models/socio';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class SociosService {

  urlApi = environment.urlApi + '/socios';

  constructor(private http: HttpClient) { }


  getSociosByIdGimnasio(id:number){
    return this.http.get<Socio[]>(`${this.urlApi}/gimnasio/${id}`, {withCredentials: true})
  }
}

export interface Socio {
  idSocio: number;
  dni: string;
  nombre: string;
  apellido: string;
  telefono: string;
  estado: boolean;
  idGimnasio: number;
}

export interface SocioCrear {
  dni: string;
  nombre: string;
  apellido: string;
  telefono: string;
  estado: boolean;
  idGimnasio: number;
  idPlan: number;
  duracion: number;
}

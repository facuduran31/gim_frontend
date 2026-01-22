export interface Plan {
  idPlan: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;
  diasPorSemana: number;
  idGimnasio?: number;
}

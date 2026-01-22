export interface Inscripcion {
  idInscripcion?: number;
  idSocio?: number;
  idPlan: number;
  fechaInicio: Date;
  fechaFin: Date;
  nombrePlan: string;
  dniSocio?: string;
}

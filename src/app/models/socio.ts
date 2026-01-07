import { Plan } from "./plan";

export interface Socio {
    idSocio: number;
    dni: string;
    nombre: string;
    apellido: string;
    telefono: string;
    estado: boolean;
    idGimnasio: number;
    
    // Opcionales
    idSocioPlan?: number;
    planActual?: Plan;
}

import { Time } from "@angular/common";

export interface Ingreso {
    idIngreso: number | undefined;
    idGimnasio: number;
    idSocio: number;
    fechaIngreso: Date;
    horaIngreso: Time;
    esValido: Boolean;
}
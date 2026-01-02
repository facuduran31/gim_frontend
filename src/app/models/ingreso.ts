import { Time } from "@angular/common";

export class Ingreso {
    idIngreso: number | undefined;
    idGimnasio: number;
    idSocio: number;
    fechaIngreso: Date;
    horaIngreso: Time;
    esValido: Boolean;

    constructor(idGimnasio: number, idSocio: number, fechaIngreso: Date, horaIngreso: Time, esValido: Boolean) {
        this.idGimnasio = idGimnasio
        this.idSocio = idSocio
        this.fechaIngreso = fechaIngreso
        this.horaIngreso = horaIngreso
        this.esValido = esValido
    }
}
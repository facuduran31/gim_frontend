export class Plan {
    idPlan: number;
    nombre: string;
    descripcion: string;
    precio: number;
    duracion: number;
    diasPorSemana: number;
    idGimnasio: number;

    constructor(id: number, nombre: string, descripcion: string, precio: number, duracion: number, diasPorSemana: number, idGimnasio: number) {
        this.idPlan = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.duracion = duracion;
        this.diasPorSemana = diasPorSemana;
        this.idGimnasio = idGimnasio;
    }
}
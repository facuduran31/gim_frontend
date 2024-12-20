export class Gimnasio {
    idGimnasio: number | undefined;
    nombre: string;
    logo: string;
    idUsuario: number | undefined;

    constructor(nombre: string, logo: string) {
        this.nombre = nombre;
        this.logo = logo;
    }
}
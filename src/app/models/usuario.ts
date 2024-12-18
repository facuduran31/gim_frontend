export class Usuario {
    id: number | undefined;
    nombre: string;
    apellido: string;
    email: string;
    contraseña: string | undefined;

    constructor(nombre: string, apellido: string, email: string, contraseña: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contraseña = contraseña;
    }
}
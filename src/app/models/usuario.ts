export class Usuario {
    id: number | undefined;
    nombre: string;
    apellido: string;
    mail: string;
    password: string | undefined;

    constructor(nombre: string, apellido: string, email: string, password: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = email;
        this.password = password;
    }

    asignarId(id: number) {
        this.id = id;
    }
}
export class Socio{
    idSocio:number;
    dni:string;
    nombre:string;
    apellido:string;
    telefono:string;
    estado:boolean;

    constructor(id:number,dni:string, nombre:string,apellido:string,tel:string,activo:boolean){
        this.idSocio= id;
        this.dni= dni;
        this.nombre= nombre;
        this.apellido= apellido;
        this.telefono= tel;
        this.estado= activo;
    }
}
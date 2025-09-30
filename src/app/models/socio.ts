export class Socio{
    idSocio:number;
    dni:string;
    nombre:string;
    apellido:string;
    telefono:string;
    estado:boolean;
    idGimnasio:number;

    constructor(id:number,dni:string, nombre:string,apellido:string,tel:string,estado:boolean, idGim:number){
        this.idSocio= id;
        this.dni= dni;
        this.nombre= nombre;
        this.apellido= apellido;
        this.telefono= tel;
        this.estado= estado;
        this.idGimnasio=idGim;
    }
}
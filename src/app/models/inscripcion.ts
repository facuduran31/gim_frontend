export class Inscripcion{
    idInscripcion:number| null=null;
    idSocio:number;
    idPlan:number;
    fechaInicio:Date;
    fechaFin:Date;
    nombrePlan:string | null=null;
    dniSocio:string | null=null;

    constructor(idInscripcion:number | null, idSocio:number,idPlan:number, fechaIni:Date,fechaFin:Date, nomPlan:string|null, dniSoc:string|null){
        this.idInscripcion=idInscripcion
        this.idSocio= idSocio;
        this.idPlan= idPlan;
        this.fechaInicio= fechaIni;
        this.fechaFin= fechaFin;
        this.nombrePlan=nomPlan;
        this.dniSocio=dniSoc;
    }
}
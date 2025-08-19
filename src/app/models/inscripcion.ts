export class Inscripcion{
    idInscripcion:number;
    idSocio:number;
    idPlan:number;
    fechaInicio:Date;
    fechaFin:Date;

    constructor(idInscripcion:number, idSocio:number,idPlan:number, fechaIni:Date,fechaFin:Date){
        this.idInscripcion=idInscripcion
        this.idSocio= idSocio;
        this.idPlan= idPlan;
        this.fechaInicio= fechaIni;
        this.fechaFin= fechaFin;
    }
}
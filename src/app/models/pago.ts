export class Pago {
  idPago!: number;
  idSocioPlan!: number;
  idMetodoPago!: number;
  monto!: number;
  fechaPago!: Date;

  constructor(
    idPago: number,
    idSocioPlan: number,
    idMetodoPago: number,
    monto: number,
    fechaPago: Date
  ) {
    this.idPago = idPago;
    this.idSocioPlan = idSocioPlan;
    this.idMetodoPago = idMetodoPago;
    this.monto = monto;
    this.fechaPago = fechaPago;
  }
}

export class Pago {
  idPago!: number;
  idSocioPlan!: number | null;
  idMetodoPago!: number | null;
  monto!: number | null;
  fechaPago!: Date | null;

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

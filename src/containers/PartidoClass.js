export default class PartidoClass {
  constructor(nombre, descripcion, fecha) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fecha = fecha;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nombre) {
    this._nombre = nombre;
  }

  get descripcion() {
    return this._descripcion;
  }

  set descripcion(descripcion) {
    this._descripcion = descripcion;
  }

  get fecha() {
    return this._fecha;
  }

  set fecha(fecha) {
    this._fecha = fecha;
  }
}

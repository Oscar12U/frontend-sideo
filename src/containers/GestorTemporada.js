import axios from "axios";

export default class GestorTemporada {
  constructor(nombreTemporada) {
    this.nombreTemporada = nombreTemporada;
  }

  get nombreTemporada() {
    return this._nombreTemporada;
  }

  set nombreTemporada(nombreTemporada) {
    this._nombreTemporada = nombreTemporada;
  }

  crearNuevaTemporada(nombre1, descripcion1, fechaInicio1, fechaFin1) {
    axios
      .post(`http://localhost:3000/api/newTemporada`, {
        nombre: nombre1,
        descripcion: descripcion1,
        fechaInicio: fechaInicio1,
        fechaFin: fechaFin1,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }
}

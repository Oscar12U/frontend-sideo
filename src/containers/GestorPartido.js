import axios from "axios";

export default class GestorPartido {
  constructor(nombrePartido) {
    this.nombrePartido = nombrePartido;
  }

  get nombrePartido() {
    return this._nombrePartido;
  }

  set nombrePartido(nombrePartido) {
    this._nombrePartido = nombrePartido;
  }

  agregarGolFavor(idAnotador, idAsistente, tiempoGol, periodoGol) {
    axios
      .post(`http://localhost:3000/api/newGolFavor`, {
        anotador: idAnotador,
        asistente: idAsistente,
        tiempoGol: tiempoGol,
        periodoGol: periodoGol,
        nombrePartido: this.nombrePartido,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  agregarGolContra() {
    axios
      .post(`http://localhost:3000/api/newGolContra`, {
        nombrePartido: this.nombrePartido,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  agregarFalta(nombreJugador) {
    axios
      .post(`http://localhost:3000/api/newFalta`, {
        nombrePartido: this.nombrePartido,
        nombreJugador: nombreJugador,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  agregarLesion(nombreJugador, descripcion) {
    console.log(descripcion);
    axios
      .post(`http://localhost:3000/api/newLesionNombre`, {
        nombreJugador: nombreJugador,
        descripcion: descripcion,
      })
      .then((resultado) => {
        //console.log(resultado);
      })
      .catch((err) => {});
  }

  crearPartido() {
    axios
      .post(`http://localhost:3000/api/newPartido`, {
        nombre: "Partido 2",
        descripcion: "Juego contra San Jose",
        fecha: "16/06/2021",
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  agregarJugador(nombreJugador) {
    axios
      .post(`http://localhost:3000/api/addJugador`, {
        nameJugador: nombreJugador,
        nombrePartido: this.nombrePartido,
      })
      .then((resultado) => {
        return resultado.data.jugador;
      })
      .catch((err) => {});
  }

  cambiarJugador(jugadorEntra, jugadorSale) {
    axios
      .post(`http://localhost:3000/api/changeJugador`, {
        entra: jugadorEntra,
        sale: jugadorSale,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  quitarJugador(nombreJugador) {
    axios
      .post(`http://localhost:3000/api/quitJugador`, {
        nombreJugador: nombreJugador,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  obtenerJugadores() {
    let jugadores;
    axios
      .get(`http://localhost:3000/api/jugadores`, {})
      .then((resultado) => {
        jugadores = resultado.data.data;
        return jugadores;
      })
      .catch((err) => {});
  }
}

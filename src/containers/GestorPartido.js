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

  agregarGolFavor(
    idAnotador,
    idAsistente,
    tiempoGol,
    periodoGol,
    asistenciaBoolean
  ) {
    axios
      .post(`https://backend-sideo.herokuapp.com/api/newGolFavor`, {
        anotador: idAnotador,
        asistente: idAsistente,
        tiempoGol: tiempoGol,
        periodoGol: periodoGol,
        nombrePartido: this.nombrePartido,
        asistenteBool: asistenciaBoolean,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  agregarGolContra() {
    axios
      .post(`https://backend-sideo.herokuapp.com/api/newGolContra`, {
        nombrePartido: this.nombrePartido,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  agregarFaltaFavor(nombreJugador) {
    axios
      .post(`https://backend-sideo.herokuapp.com/api/newFaltaAFavor`, {
        nombrePartido: this.nombrePartido,
        nombreJugador: nombreJugador,
      })
      .then((resultado) => {})
      .catch((err) => {});
  }

  agregarFaltaContra(nombreJugador) {
    axios
      .post(`https://backend-sideo.herokuapp.com/api/newFaltaEnContra`, {
        nombrePartido: this.nombrePartido,
      })
      .then((resultado) => {})
      .catch((err) => {});
  }

  agregarLesion(nombreJugador, descripcion) {
    console.log(descripcion);
    axios
      .post(`https://backend-sideo.herokuapp.com/api/newLesionNombre`, {
        nombreJugador: nombreJugador,
        descripcion: descripcion,
      })
      .then((resultado) => {})
      .catch((err) => {});
  }

  crearPartido(nombre1, descripcion1, fecha1) {
    axios
      .post(`https://backend-sideo.herokuapp.com/api/newPartido`, {
        nombre: nombre1,
        descripcion: descripcion1,
        fechaPartido: fecha1,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  agregarJugador(nombreJ) {
    console.log(nombreJ);
    axios
      .post(`https://backend-sideo.herokuapp.com/api/addJugador`, {
        nombreJugador: nombreJ,
        nombrePartido: this.nombrePartido,
      })
      .then((resultado) => {
        return resultado.data.jugador;
      })
      .catch((err) => {});
  }

  cambiarJugador(jugadorEntra, jugadorSale) {
    axios
      .post(`https://backend-sideo.herokuapp.com/api/changeJugador`, {
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
      .post(`https://backend-sideo.herokuapp.com/api/quitJugador`, {
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
      .get(`https://backend-sideo.herokuapp.com/api/jugadores`, {})
      .then((resultado) => {
        jugadores = resultado.data.data;
        return jugadores;
      })
      .catch((err) => {});
  }

  agregarPartidoTemporada(temporadaID) {
    axios
      .post(`https://backend-sideo.herokuapp.com/api/agregarPartidoTempo`, {
        temporada: temporadaID,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  finalizarPartido(partidoID, arrayTiempos) {
    console.log(arrayTiempos);
    axios
      .post(`https://backend-sideo.herokuapp.com/api/finalizarPartido`, {
        partido: partidoID,
        tiempos: arrayTiempos,
      })
      .then((resultado) => {
        //console.log(resultado);
      })
      .catch((err) => {});
  }
}

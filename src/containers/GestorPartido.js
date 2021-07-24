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

  agregarGolFavor(idAnotador, idAsistente, tiempo, periodoGol) {
    axios
      .post(`http://localhost:3000/api/newGolFavor`, {
        anotador: idAnotador,
        asistente: idAsistente,
        tiempoGol: tiempo,
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
      .then((resultado) => {})
      .catch((err) => {});
  }

  agregarFaltaFavor(nombreJugador) {
    axios
      .post(`http://localhost:3000/api/newFaltaAFavor`, {
        nombrePartido: this.nombrePartido,
        nombreJugador: nombreJugador,
      })
      .then((req, res) => {
        // res.send({ data: res.data });
      })
      .catch((err) => {});
  }

  agregarFaltaContra(nombreJugador) {
    axios
      .post(`http://localhost:3000/api/newFaltaEnContra`, {
        nombrePartido: this.nombrePartido,
      })
      .then((resultado) => {})
      .catch((err) => {});
  }

  agregarLesion(nombreJugador, descripcion) {
    console.log(descripcion);
    axios
      .post(`http://localhost:3000/api/newLesion`, {
        nombreJugador: nombreJugador,
        descripcion: descripcion,
      })
      .then((resultado) => {})
      .catch((err) => {});
  }

  crearPartido(nombre1, descripcion1, fecha1) {
    axios
      .post(`http://localhost:3000/api/newPartido`, {
        nombre: nombre1,
        descripcion: descripcion1,
        fechaPartido: fecha1,
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

  agregarPartidoTemporada(temporadaID) {
    axios
      .post(`http://localhost:3000/api/agregarPartidoTempo`, {
        temporada: temporadaID,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  finalizarPartido(partidoID, arrayTiempos) {
    axios
      .post(`http://localhost:3000/api/finalizarPartido`, {
        partido: partidoID,
        tiempos: arrayTiempos,
      })
      .then((resultado) => {
        //console.log(resultado);
      })
      .catch((err) => {});
  }
}

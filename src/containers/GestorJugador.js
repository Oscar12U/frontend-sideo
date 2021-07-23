import axios from "axios";

export default class GestorJugador {
  constructor() { }
  crearJugador(nombreJugador) {
    axios
      .post(`https://backend-sideo.herokuapp.com/api/newJugador`, {
        nombre: nombreJugador,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => { });
  }
  eliminarJugador(jugadorID) {
    console.log("asdasd", jugadorID);
    axios
      .post(`https://backend-sideo.herokuapp.com/api/deleteJugador`, {
        jugador: jugadorID,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => { });
  }
}

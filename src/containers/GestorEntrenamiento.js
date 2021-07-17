import axios from "axios";

export default class GestorEntrenamiento {
  constructor() {}
  agregarJugadorEntrenamiento(nombreJugador, entrenamiento1) {
    axios
      .post(`http://localhost:3000/api/agregarJugadorPartido`, {
        entrenamiento: entrenamiento1,
        jugador: nombreJugador,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  entrenandoJugador(jugadorID) {
    //console.log("asdasd", jugadorID);
    axios
      .post(`http://localhost:3000/api/entrenandoJugador`, {
        jugador: jugadorID,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  enviarLesionJugador(descripcion1, jugador1) {
    axios
      .post(`http://localhost:3000/api/newLesion`, {
        descripcion: descripcion1,
        jugador: jugador1,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  enviarComentario(entrenamiento1, comentario1) {
    axios
      .post(`http://localhost:3000/api/agregarComentario`, {
        entrenamiento: entrenamiento1,
        comentario: comentario1,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  finalizarEntrenamiento(entrenamiento1) {
    axios
      .post(`http://localhost:3000/api/finalizarEntrentramiento`, {
        entrenamiento: entrenamiento1,
      })
      .then((resultado) => {
        //console.log(resultado);
      })
      .catch((err) => {});
  }

  crearActividad(nombre1, descripcion1, tiempo1) {
    axios
      .post(`http://localhost:3000/api/newActividad`, {
        nombre: nombre1,
        descripcion: descripcion1,
        tiempoMinutos: tiempo1,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  agregarActividadNueva(entrenamiento1, actividad1) {
    axios
      .post(`http://localhost:3000/api/agregarActividadEntrenamiento`, {
        entrenamiento: entrenamiento1,
        actividad: actividad1,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  crearNuevoEntrenamiento(nombre1, descripcion1) {
    axios
      .post(`http://localhost:3000/api/newEntrenamiento`, {
        nombre: nombre1,
        descripcion: descripcion1,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  agregarEntrenamientoTemporada(temporadaID) {
    axios
      .post(`http://localhost:3000/api/agregarEntrenamientoTempo`, {
        temporada: temporadaID,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  crearNuevoComentarioActividad(
    entrenamiento1,
    actividad1,
    jugador1,
    comentario1
  ) {
    axios
      .post(`http://localhost:3000/api/newActividadComentario`, {
        jugador: jugador1,
        entrenamiento: entrenamiento1,
        actividad: actividad1,
        comentario: comentario1,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  ausenciaJustificada(jugadorID, entrenamiento1) {
    //console.log("asdasd", jugadorID);
    axios
      .post(`http://localhost:3000/api/newAusencia`, {
        jugador: jugadorID,
        entrenamiento: entrenamiento1,
        justificada: true,
        injustificada: false,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  ausenciaInjustificada(jugadorID, entrenamiento1) {
    //console.log("asdasd", jugadorID);
    axios
      .post(`http://localhost:3000/api/newAusencia`, {
        jugador: jugadorID,
        entrenamiento: entrenamiento1,
        justificada: false,
        injustificada: true,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }

  actualizarAusenciaJugador(jugadorID) {
    axios
      .post(`http://localhost:3000/api/ausenteJugador`, {
        jugador: jugadorID,
      })
      .then((resultado) => {
        console.log(resultado);
      })
      .catch((err) => {});
  }
}

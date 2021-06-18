import axios from "axios";

export default class GestorPartido {
  constructor(nombrePartido) {
    this.nombrePartido = nombrePartido;
  }

  agregarGol(idAnotador, idAsistente, tiempoGol, periodoGol) {
    axios
      .post(`http://localhost:3000/api/newGol`, {
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
}

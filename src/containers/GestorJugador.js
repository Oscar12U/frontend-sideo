import axios from "axios";

export default class GestorJugador {
    constructor() { }
    crearJugador(nombreJugador) {
        axios
            .post(`http://localhost:3000/api/newJugador`, {
                nombre: nombreJugador,
            })
            .then((resultado) => {
                console.log(resultado);
            })
            .catch((err) => { });
    }
}
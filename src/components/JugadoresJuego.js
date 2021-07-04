import React, { memo, useEffect } from "react";
import Jugador from "./Jugador";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

const JugadoresJuego = () => {
  const [jugadoresTitulares, setJugadoresTitulares] = React.useState([]);
  const [jugadoresSustitutos, setJugadoresSustitutos] = React.useState([]);
  const [jugadoresFuera, setJugadoresFuera] = React.useState([]);

  useEffect(() => {
    actualizarJugadoresBD();
    console.log("actualizando JugadoresBD");
  }, []);

  function actualizarJugadoresBD() {
    axios
      .get(`http://localhost:3000/api/jugadores`)
      .then((resultado) => {
        let jugadoresList = resultado.data.data;
        let listEnJuego = [];
        let listSustitutos = [];
        let listNoConvocados = [];
        jugadoresList.forEach((element) => {
          if (element.jugando) {
            listEnJuego.push(element.nombre);
          } else if (element.convocado) {
            listSustitutos.push(element.nombre);
          } else {
            listNoConvocados.push(element.nombre);
          }
        });
        setJugadoresTitulares(listEnJuego);
        setJugadoresSustitutos(listSustitutos);
        setJugadoresFuera(listNoConvocados);
      })
      .catch((err) => {});
  }

  const actualizarJugadoresJuego = (newJugador, recienAgregado) => {
    setJugadoresTitulares([...jugadoresTitulares, newJugador]);

    if (recienAgregado) {
      let pos = jugadoresFuera.indexOf(newJugador);
      jugadoresFuera.splice(pos, 1);
    } else {
      let pos = jugadoresSustitutos.indexOf(newJugador);
      jugadoresSustitutos.splice(pos, 1);
    }
  };
  const QuitJugadorTitular = (newJugador) => {
    setJugadoresSustitutos([...jugadoresSustitutos, newJugador]);
    let pos = jugadoresTitulares.indexOf(newJugador);
    jugadoresTitulares.splice(pos, 1);

    axios
      .post(`http://localhost:3000/api/quitJugador`, {
        nombreJugador: newJugador,
      })
      .then((resultado) => {})
      .catch((err) => {});
  };

  const AddJugadorTitular = (jugador, recienAgregado) => {
    axios
      .post(`http://localhost:3000/api/addJugador`, {
        nombreJugador: jugador,
        nombrePartido: "Partido 1",
        titular: true,
      })
      .then((resultado) => {})
      .catch((err) => {});

    actualizarJugadoresJuego(jugador, recienAgregado);
  };

  const AddJugadorSustituto = (newJugador) => {
    axios
      .post(`http://localhost:3000/api/addJugador`, {
        nombreJugador: newJugador,
        nombrePartido: "Partido 1",
        titular: false,
      })
      .then((resultado) => {})
      .catch((err) => {});

    setJugadoresSustitutos([...jugadoresSustitutos, newJugador]);
    let pos = jugadoresFuera.indexOf(newJugador);
    jugadoresFuera.splice(pos, 1);
  };

  const RemoveJugador = (newJugador, titular) => {
    setJugadoresFuera([...jugadoresFuera, newJugador]);
    if (titular) {
      let pos = jugadoresTitulares.indexOf(newJugador);
      jugadoresTitulares.splice(pos, 1);
    } else {
      let pos = jugadoresSustitutos.indexOf(newJugador);
      jugadoresSustitutos.splice(pos, 1);
    }

    axios
      .post(`http://localhost:3000/api/removeJugadorPartido`, {
        nombreJugador: newJugador,
        nombrePartido: "Partido 1",
      })
      .then((resultado) => {})
      .catch((err) => {});
  };

  return (
    <>
      <h2>Jugadores Titulares</h2>
      {jugadoresTitulares.map((jugador, index) => {
        return (
          <>
            <Jugador key={index} jugador={jugador} />
            <Button
              variant="contained"
              color="gray"
              onClick={() => QuitJugadorTitular(jugador)}
            >
              Agregar Jugador Sustituto
            </Button>
            <Button
              variant="contained"
              color="gray"
              onClick={() => RemoveJugador(jugador, true)}
            >
              Sacar de la Convocatoria
            </Button>
          </>
        );
      })}
      <h2>Jugadores Sustitutos</h2>
      {jugadoresSustitutos.map((jugador, index) => {
        return (
          <>
            <Jugador key={index} jugador={jugador} />
            <Button
              variant="contained"
              color="gray"
              onClick={() => AddJugadorTitular(jugador, false)}
            >
              Agregar Jugador Titular
            </Button>
            <Button
              variant="contained"
              color="gray"
              onClick={() => RemoveJugador(jugador, false)}
            >
              Sacar de la Convocatoria
            </Button>
          </>
        );
      })}
      <h2>Jugadores No Convocados</h2>
      {jugadoresFuera.map((jugador, index) => {
        return (
          <>
            <Jugador key={index} jugador={jugador} />
            <Button
              variant="contained"
              color="gray"
              onClick={() => AddJugadorTitular(jugador, true)}
            >
              Agregar Jugador Titular
            </Button>
            <Button
              variant="contained"
              color="gray"
              onClick={() => AddJugadorSustituto(jugador)}
            >
              Agregar Jugador Sustituto
            </Button>
          </>
        );
      })}
    </>
  );
};

export default withRouter(JugadoresJuego);

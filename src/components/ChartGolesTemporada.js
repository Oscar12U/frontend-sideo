import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { withRouter } from "react-router-dom";
import axios from "axios";

const ChartGolesTemporada = () => {
  const [jugadores, setJugadores] = React.useState([]);

  useEffect(() => {
    actualizarJugadoresBD();
    console.log("actualizando JugadoresBD");
  }, []);

  function actualizarJugadoresBD() {
    axios
      .get(`http://localhost:3000/api/jugadores`)
      .then((resultado) => {
        let jugadoresList = resultado.data.data;
        let prueba = getList(resultado.data.data);
        setJugadores(prueba);
      })
      .catch((err) => {});
  }

  const getList = (jugadores) => {
    let listJugadores = [];
    jugadores.map((jugador, index) => {
      let jugadorNuevo = {
        nombre: jugador.nombre,
        cantGoles: jugador.cantGoles,
      };
      listJugadores.push(jugadorNuevo);
    });
    console.log(listJugadores);
    return listJugadores;
  };

  return (
    <>
      <Paper>
        <Chart data={jugadores}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries valueField="cantGoles" argumentField="nombre" />
          <Title text="Goles" />
          <Animation />
        </Chart>
      </Paper>
    </>
  );
};

export default withRouter(ChartGolesTemporada);

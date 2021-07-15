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
  const [jugadoresMinutosJugados, setJugadoresMinutosJugados] = React.useState(
    []
  );
  const [entrenamientos, setEntrenamientos] = React.useState([]);

  useEffect(() => {
    actualizarJugadoresBD();
    getListEntrenamientos();
    console.log("actualizando JugadoresBD");
  }, []);

  function actualizarJugadoresBD() {
    axios
      .get(`http://localhost:3000/api/jugadores`)
      .then((resultado) => {
        let jugadoresList = resultado.data.data;
        let prueba = getList(resultado.data.data);
        let minJugadores = getListMin(resultado.data.data);
        setJugadores(prueba);
        setJugadoresMinutosJugados(minJugadores);
      })
      .catch((err) => {});
  }

  function getListEntrenamientos() {
    axios.get(`http://localhost:3000/api/entrenamientos/`).then((resultado) => {
      let listEntrenamientos = getEntrenamientos(resultado.data.data);
      setEntrenamientos(listEntrenamientos);
    });
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

  const getListMin = (jugadores) => {
    let listJugadoresMin = [];
    jugadores.map((jugador, index) => {
      let jugadorMin = {
        nombre: jugador.nombre,
        minutos: jugador.tiempoMinutosJuego,
      };

      listJugadoresMin.push(jugadorMin);
    });
    return listJugadoresMin;
  };

  const getEntrenamientos = (entrenamientos) => {
    let listEntrenamientos = [];
    entrenamientos.map((entrenamiento, index) => {
      let cantEntrenamiento = {
        nombre: entrenamiento.nombre,
        cantActividades: entrenamiento.actividades.length,
      };
      listEntrenamientos.push(cantEntrenamiento);
    });
    return listEntrenamientos;
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
      <br></br>
      <Paper>
        <Chart data={jugadoresMinutosJugados}>
          <ArgumentAxis />
          <ValueAxis max={7} />
          <BarSeries valueField="minutos" argumentField="nombre" />
          <Title text="Minutos Jugados" />
          <Animation />
        </Chart>
      </Paper>
      <br></br>
      <Paper>
        <Chart data={entrenamientos}>
          <ArgumentAxis />
          <ValueAxis max={7} />
          <BarSeries valueField="cantActividades" argumentField="nombre" />
          <Title text="Minutos Jugados" />
          <Animation />
        </Chart>
      </Paper>
    </>
  );
};

export default withRouter(ChartGolesTemporada);

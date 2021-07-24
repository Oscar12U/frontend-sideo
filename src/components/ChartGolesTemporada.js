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
import Typography from "@material-ui/core/Typography";
const ChartGolesTemporada = (props) => {
  //console.log("valor esperado: ", props.temporada);
  const [jugadoresMinutosJugados, setJugadoresMinutosJugados] = React.useState(
    []
  );
  const [entrenamientos, setEntrenamientos] = React.useState([]);
  const [golesID, setGolesID] = React.useState([]);

  const [partidos, setPartidos] = React.useState([]);
  const [entrenamientosTempo, setEntrenamientosTempo] = React.useState([]);
  const [jugadorGol, setJugadorGol] = React.useState([]);
  const [faltasAFavor, setFaltasAFavor] = React.useState([]);
  const [faltasEnContra, setFaltasEnContra] = React.useState([]);
  const [ausenciasJugador, setAusenciasJugador] = React.useState([]);

  const [jugadoresPorEntrenamiento, setJugadoresPorEntrenamiento] =
    React.useState([]);

  useEffect(() => {
    actualizarJugadoresBD();
    getListEntrenamientos();
    obtenerPartidosGoles();
    obtenerEntrenamientoActividades();

    //console.log("actualizando JugadoresBD");
  }, []);

  function obtenerPartidosGoles() {
    let partidos = props.temporada.partidos;
    //console.log("inicio  ", partidos);

    partidos.map((partido, index) => {
      //console.log("partido especifico: ", partido);
      axios
        .get(`https://backend-sideo.herokuapp.com/api/getPartido/${partido}`)
        .then((resultado) => {
          let partido = resultado.data.data;
          let golID = resultado.data.data.goles;
          //console.log("partidos ", partidosDetalles);
          let partidoNuevo = {
            Nombre: partido.nombre,
            GolesContra: partido.cantGolesContra,
          };
          let faltasAFavorNuevas = {
            Nombre: partido.nombre,
            FaltasAFavor: partido.faltasAFavor,
          };
          let faltasEnContraNuevas = {
            Nombre: partido.nombre,
            FaltasEnContra: partido.faltasEnContra,
          };

          setFaltasAFavor((faltasAFavor) => [
            ...faltasAFavor,
            faltasAFavorNuevas,
          ]);
          setFaltasEnContra((faltasEnContra) => [
            ...faltasEnContra,
            faltasEnContraNuevas,
          ]);
          setPartidos((partidos) => [...partidos, partidoNuevo]);
          golesEspecificos(golID);
        })
        .catch((err) => { });
    });
  }

  function obtenerEntrenamientoActividades() {
    let entrenamientos = props.temporada.entrenamientos;
    //console.log("inicio  ", entrenamientos);

    entrenamientos.map((entrenamiento, index) => {
      //console.log("partido especifico: ", partido);
      axios
        .get(`https://backend-sideo.herokuapp.com/api/entrenamientos/${entrenamiento}`)
        .then((resultado) => {
          let entrenamiento = resultado.data.data;
          //console.log("entrenamientios ", entrenamiento);
          let entrenamientoNuevo = {
            Nombre: entrenamiento.nombre,
            CantidadActividades: entrenamiento.actividades.length,
          };
          let cantidadJugadores = {
            Nombre: entrenamiento.nombre,
            CantidadJugadores: entrenamiento.jugadores.length,
          };
          obtenerAusencias(entrenamiento);
          setJugadoresPorEntrenamiento((jugadoresPorEntrenamiento) => [
            ...jugadoresPorEntrenamiento,
            cantidadJugadores,
          ]);
          setEntrenamientosTempo((entrenamientosTempo) => [
            ...entrenamientosTempo,
            entrenamientoNuevo,
          ]);
        })
        .catch((err) => { });
    });
  }

  function obtenerAusencias(entrenamientos) {
    //console.log("entrenamientosi: ", entrenamiento._id);
    axios
      .get(`https://backend-sideo.herokuapp.com/api/ausencia`)
      .then((resultado) => {
        let ausencia = resultado.data.data;
        //setAusenciasJugador(ausencia);
        obtenerJugadorAusente(ausencia, entrenamientos);
      })
      .catch((err) => { });
  }

  function obtenerJugadorAusente(ausencia, entrenamientos) {
    // let arrayValores = [];
    // ausencia.map((ausencia, index1) => {
    //   let jugadorAusente = {
    //     id: ausencia.jugador,
    //     cantidad: 0,
    //   };
    //   arrayValores.push(jugadorAusente);

    //   ausencia.map((ausencia, index2) => {
    //     if (jugadorAusente.id === ausencia.jugador) {

    //       arrayValores[index1].cantidad += 1;

    //     }
    //   });
    // });
    let sampleArray = ausencia;

    const results = [
      ...sampleArray
        .reduce((mp, o) => {
          if (!mp.has(o.jugador)) mp.set(o.jugador, { ...o, count: 0 });
          mp.get(o.jugador).count++;
          return mp;
        }, new Map())
        .values(),
    ];

    //console.log("asdada", results);

    results.map((result, index) => {
      if (result.entrenamiento === entrenamientos._id) {
        axios
          .get(`https://backend-sideo.herokuapp.com/api/jugador/${result.jugador}`)
          .then((resultado) => {
            let jugador = resultado.data.data;
            //console.log("algun gol: ", gol);
            let jugadorAusente = {
              Nombre: jugador.nombre,
              Cantidad: result.count,
            };

            //console.log(jugadorAusente)
            setAusenciasJugador((ausenciasJugador) => [
              ...ausenciasJugador,
              jugadorAusente,
            ]);
          })
          .catch((err) => { });
      }
    });
  }

  function golesEspecificos(golesID) {
    //console.log("muchos goles: ", golesID);
    golesID.map((golID, index) => {
      axios
        .get(`https://backend-sideo.herokuapp.com/api/golEspecifico/${golID}`)
        .then((resultado) => {
          let gol = resultado.data.data;
          //console.log("algun gol: ", gol);
          let golListo = convertirGolTiempo(gol, index);
          obtenerJugador(gol.anotador, gol);
          setGolesID((goles) => [...goles, golListo]);
        })
        .catch((err) => { });
    });
  }

  function convertirGolTiempo(gol, index) {
    let golNuevo = {
      Gol: "Gol " + index,
      TiempoMin: gol.tiempoGol,
    };
    return golNuevo;
  }

  function obtenerJugador(jugadorID, gol) {
    axios
      .get(`https://backend-sideo.herokuapp.com/api/jugador/${jugadorID}`)
      .then((resultado) => {
        let jugador = resultado.data.data;
        //console.log("algun gol: ", gol);
        let anotadorNuevo = {
          Anotador: jugador.nombre,
          TiempoMin: gol.tiempoGol,
        };

        setJugadorGol((jugadorGol) => [...jugadorGol, anotadorNuevo]);
      })
      .catch((err) => { });
  }

  function conversionGolesTiempo() {
    let listGoles = [];
    golesID.map((gol, index) => {
      let golNuevo = {
        Gol: "Gol " + index,
        TiempoMin: gol.tiempoGol,
      };
      listGoles.push(golNuevo);
    });
    console.log("listras: ", listGoles);
    return listGoles;
  }

  function actualizarJugadoresBD() {
    axios
      .get(`https://backend-sideo.herokuapp.com/api/jugadores`)
      .then((resultado) => {
        let jugadoresList = resultado.data.data;
        let prueba = getList(resultado.data.data);
        let minJugadores = getListMin(resultado.data.data);
        setJugadoresMinutosJugados(minJugadores);
      })
      .catch((err) => { });
  }

  function getListEntrenamientos() {
    axios.get(`https://backend-sideo.herokuapp.com/api/entrenamientos/`).then((resultado) => {
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
      <Typography
        style={{
          fontFamily: "Arial",
          fontSize: "200%",
          display: "flex",
          fontWeight: "bold",
          justifyContent: "center",
          textAlign: "justify",
          textJustify: "inter-word",
          marginBottom: "15px",
        }}
      >
        Gráficos De Partidos:
      </Typography>
      <Paper>
        <Chart data={golesID}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries valueField="TiempoMin" argumentField="Gol" />
          <Title text="Goles A Favor En Minutos" />
          <Animation />
        </Chart>
      </Paper>
      <br></br>
      <Paper>
        <Chart data={jugadorGol}>
          <ArgumentAxis />
          <ValueAxis max={7} />
          <BarSeries valueField="TiempoMin" argumentField="Anotador" />
          <Title text="Tiempo de Gol De Anotador" />
          <Animation />
        </Chart>
      </Paper>
      <br></br>
      <Paper>
        <Chart data={faltasAFavor}>
          <ArgumentAxis />
          <ValueAxis max={7} />
          <BarSeries valueField="FaltasAFavor" argumentField="Nombre" />
          <Title text="Cantidad de Faltas a Favor por Partido" />
          <Animation />
        </Chart>
      </Paper>
      <br></br>
      <Paper>
        <Chart data={faltasEnContra}>
          <ArgumentAxis />
          <ValueAxis max={7} />
          <BarSeries valueField="FaltasEnContra" argumentField="Nombre" />
          <Title text="Cantidad de Faltas En Contra por Partido" />
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
        <Chart data={partidos}>
          <ArgumentAxis />
          <ValueAxis max={7} />
          <BarSeries valueField="GolesContra" argumentField="Nombre" />
          <Title text="Goles en Contra en Partidos" />
          <Animation />
        </Chart>
      </Paper>
      <br></br>
      <br></br> <br></br>
      <Typography
        style={{
          fontFamily: "Arial",
          fontSize: "200%",
          display: "flex",
          fontWeight: "bold",
          justifyContent: "center",
          textAlign: "justify",
          textJustify: "inter-word",
          marginBottom: "15px",
        }}
      >
        Gráficos De Entrenamientos:
      </Typography>
      <br></br>
      <Paper>
        <Chart data={entrenamientosTempo}>
          <ArgumentAxis />
          <ValueAxis max={7} />
          <BarSeries valueField="CantidadActividades" argumentField="Nombre" />
          <Title text="Actividades Por Entrenamiento" />
          <Animation />
        </Chart>
      </Paper>
      <br></br>
      <Paper>
        <Chart data={ausenciasJugador}>
          <ArgumentAxis />
          <ValueAxis max={7} />
          <BarSeries valueField="Cantidad" argumentField="Nombre" />
          <Title text="Ausencias de jugadores en Entrenamientos" />
          <Animation />
        </Chart>
      </Paper>
      <br></br>
      <Paper>
        <Chart data={jugadoresPorEntrenamiento}>
          <ArgumentAxis />
          <ValueAxis max={7} />
          <BarSeries valueField="CantidadJugadores" argumentField="Nombre" />
          <Title text="Jugadores Por Entrenamiento" />
          <Animation />
        </Chart>
      </Paper>
    </>
  );
};

export default withRouter(ChartGolesTemporada);

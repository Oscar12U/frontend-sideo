import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Bar } from "react-chartjs-2";
import { withRouter } from "react-router-dom";
import axios from "axios";

const Prueba = () => {
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
        setJugadores(jugadoresList);
      })
      .catch((err) => {});
  }

  const getNombres = () => {
    let nombres = [];
    jugadores.map((jugador, index) => {
      nombres.push(jugador.nombre);
    });
    return nombres;
  };

  const getGoles = () => {
    let goles = [];
    jugadores.map((jugador, index) => {
      goles.push(jugador.cantGoles);
    });
    return goles;
  };

  const dataBar = {
    labels: getNombres(),
    datasets: [
      {
        label: "Cantidad Goles",
        data: getGoles(),

        borderWidth: 2,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          barPercentage: 1,
          gridLines: {
            display: true,

            color: "rgba(0, 0, 0, 0.1)",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <MDBContainer>
        <h3 className="mt-5">Goles por Temporada</h3>
        <Bar data={dataBar} options={barChartOptions} />
      </MDBContainer>
    </>
  );
};

export default withRouter(Prueba);

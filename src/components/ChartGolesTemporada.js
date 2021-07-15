import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

const data = [
  { year: "1950", population: 2.525 },
  { year: "1960", population: 3.018 },
  { year: "1970", population: 3.682 },
  { year: "1980", population: 4.44 },
  { year: "1990", population: 5.31 },
  { year: "2000", population: 6.127 },
  { year: "2010", population: 6.93 },
];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper>
        <Chart data={chartData}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries valueField="population" argumentField="year" />
          <Title text="Goles" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}

// import React, { useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import { MDBContainer } from "mdbreact";
// import { Bar } from "react-chartjs-2";
// import { withRouter } from "react-router-dom";
// import axios from "axios";

// const ChartGolesTemporada = () => {
//   const [jugadores, setJugadores] = React.useState([]);

//   useEffect(() => {
//     actualizarJugadoresBD();
//     console.log("actualizando JugadoresBD");
//   }, []);

//   function actualizarJugadoresBD() {
//     axios
//       .get(`http://localhost:3000/api/jugadores`)
//       .then((resultado) => {
//         let jugadoresList = resultado.data.data;
//         setJugadores(jugadoresList);
//       })
//       .catch((err) => {});
//   }

//   const getNombres = () => {
//     let nombres = [];
//     jugadores.map((jugador, index) => {
//       nombres.push(jugador.nombre);
//     });
//     return nombres;
//   };

//   const getGoles = () => {
//     let goles = [];
//     jugadores.map((jugador, index) => {
//       goles.push(jugador.cantGoles);
//     });
//     return goles;
//   };

//   const dataBar = {
//     labels: getNombres(),
//     datasets: [
//       {
//         label: "Cantidad Goles",
//         data: getGoles(),

//         borderWidth: 2,
//       },
//     ],
//   };

//   const barChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       xAxes: [
//         {
//           barPercentage: 1,
//           gridLines: {
//             display: true,

//             color: "rgba(0, 0, 0, 0.1)",
//           },
//         },
//       ],
//       yAxes: [
//         {
//           gridLines: {
//             display: true,
//             color: "rgba(0, 0, 0, 0.1)",
//           },
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   };

//   return (
//     <>
//       <MDBContainer>
//         <h3 className="mt-5">Goles por Temporada</h3>
//         <Bar data={dataBar} options={barChartOptions} />
//       </MDBContainer>
//     </>
//   );
// };

// export default withRouter(ChartGolesTemporada);

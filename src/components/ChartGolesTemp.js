import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import axios from "axios";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// let numRandom1 = getRandomArbitrary(0, 256);
// let numRandom2 = getRandomArbitrary(0, 256);
// let numRandom3 = getRandomArbitrary(0, 256);

const jugadores12 = [
  {
    Nombre: "Ricardo",
    Goles: 12,
  },
  {
    Nombre: "Luis",
    Goles: 5,
  },
  {
    Nombre: "Alfredo",
    Goles: 7,
  },
  {
    Nombre: "Maikol",
    Goles: 8,
  },
  {
    Nombre: "Oscar",
    Goles: 3,
  },
  {
    Nombre: "Kevin",
    Goles: 13,
  },
  {
    Nombre: "Ignacio",
    Goles: 30,
  },
];

let listJugadores = [];

// function nombres() {
//   let element = [];

//   for (let i = 0; i < jugadores12.length; i++) {
//     element.push(jugadores12[i].Nombre);
//   }

//   return element;
// }

// function goles() {
//   let element = [];

//   for (let i = 0; i < jugadores12.length; i++) {
//     element.push(jugadores12[i].Goles);
//   }

//   return element;
// }

// function obtJugadoresAxios() {
//   axios.get(`http://localhost:3000/api/jugadores/`).then((resultado) => {
//     const jugadores1 = resultado.data.data;
//     console.log("");
//     this.setState({
//       jugadores: jugadores1,
//     });
//   });
// }

//const [jugadores, setJugadores] = React.useState("");

class ChartGolesTemp extends React.Component {
  constructor(props) {
    super(props);
    this.obtJugadoresAxios = this.obtJugadoresAxios.bind(this);
    //this.Nombres = this.Nombres.bind(this);
    //this.Goles = this.Goles.bind(this);
    this.state = {
      jugadores: this.obtJugadoresAxios(),
      // dataBar: {
      //   //Con esta parte se define el nombre de los datos
      //   labels: this.Nombres(),

      //   datasets: [
      //     {
      //       //Con esta parte se define el nombre del titulo y los datos asi como el color de cada barra
      //       label: "Cantidad Goles",
      //       data: this.Goles(),
      //       // backgroundColor: [
      //       //   "rgba(" +
      //       //     numRandom1 +
      //       //     "," +
      //       //     numRandom2 +
      //       //     "," +
      //       //     numRandom3 +
      //       //     ",0.7)",
      //       // ],
      //       //Con esta parte se define el grosor de la linea
      //       borderWidth: 2,
      //       //Con esta parte se define el color de la linea
      //       // borderColor: [
      //       //   "rgba(" + numRandom1 + "," + numRandom2 + "," + numRandom3 + ",1)",
      //       // ],
      //     },
      //   ],
      // },
      // barChartOptions: {
      //   responsive: true,
      //   maintainAspectRatio: false,
      //   scales: {
      //     xAxes: [
      //       {
      //         //Con esta parte se define el tamaño de la linea, mejor no tocar
      //         barPercentage: 1,
      //         gridLines: {
      //           display: true,
      //           //Con esta parte se define el color de las lines divisorias del grafico
      //           color: "rgba(0, 0, 0, 0.1)",
      //         },
      //       },
      //     ],
      //     yAxes: [
      //       {
      //         gridLines: {
      //           display: true,
      //           color: "rgba(0, 0, 0, 0.1)",
      //         },
      //         ticks: {
      //           beginAtZero: true,
      //         },
      //       },
      //     ],
      //   },
      // },
    };
  }

  //componentDidMount() {}
  obtJugadoresAxios = () => {
    axios.get(`http://localhost:3000/api/jugadores`).then((resultado) => {
      let jugadores1 = [];
      jugadores1 = resultado.data.data;
      console.log("jugadores!!!!!: ", resultado.data.data);
      return jugadores1;
      // this.setState({
      //   jugadores: resultado.data.data,
      // });
      // this.state.jugadores = jugadores1;
    });
    //console.log("hola aqui", this.state.jugadores);
  };

  Nombres() {
    let element = [];
    //let jugadores = this.state.jugadores;
    //console.log("Aquí " + jugadores);
    //console.log(this.state.jugadores); (AQUI)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //console.log("hola aqui", this.state.jugadores);
    for (let i = 0; i < listJugadores.length; i++) {
      element.push(listJugadores[i].nombre);
    }

    return element;
  }

  Goles() {
    let element = [];

    for (let i = 0; i < listJugadores.length; i++) {
      element.push(listJugadores[i].cantGoles);
    }

    return element;
  }

  render() {
    const jugadores = this.state.jugadores;
    console.log("Aqui Esta!!!!!!!!!!!!!!! " + jugadores);
    return (
      <MDBContainer>
        {/* {console.log("Aqui Esta " + this.state.jugadores)} */}
        <h3 className="mt-5">Goles por Temporada</h3>
        {/* <Bar data={this.state.dataBar} options={this.state.barChartOptions} /> */}
      </MDBContainer>
    );
  }
}

export default ChartGolesTemp;

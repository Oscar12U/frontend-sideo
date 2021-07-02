import React from 'react';
import ReactDOM from 'react-dom';
import StopwatchDisplay from './StopwatchDisplay.jsx';
import axios from "axios";

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      running: false,
      finalizar: false,
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    };
    
  }
//  componentDidMount(){
//    console.log("dentro",this.props.iniciar)
//     this.inicioAutomatico()
//   } 
  componentDidUpdate() {
    // Uso tipico (no olvides de comparar las props):
   // console.log("dentro",this.props.iniciar)
    this.inicioAutomatico()
  }

   ingresarTiempoJugador = (entrenamiento1, jugador1, actividad1) =>{
    if(!this.state.running){
      this.setState({ finalizar: true });
        axios
              .post(`http://localhost:3000/api/newActividadJugador`, {
                entrenamiento: entrenamiento1,
                jugador: jugador1,
                actividad: actividad1,
                minutos: this.state.currentTimeMin,
                segundos: this.state.currentTimeSec
              })
              .then((resultado) => {
                console.log(resultado);
              })
              .catch((err) => {});

    }
  }


  formatTime = (val, ...rest) => {
    let value = val.toString();
    if (value.length < 2) {
      value = '0' + value;
    }
    if (rest[0] === 'ms' && value.length < 3) {
      value = '0' + value;
    }
    return value;
  };

  inicioAutomatico = () =>{
    //console.log("aqui va el boleano",this.props.iniciar)
    if (this.props.iniciar && this.state.finalizar === false) {
      if(!this.state.running){
        this.start(); 
      }
    }

  }

  start = () => {
    
    if (!this.state.running) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.pace(), 10);
    }
  };

  stop = () => {
    this.setState({ running: false });
    // console.log("entranamientoID: ",this.props.entrenamiento)
    // console.log("jugadorID: ",this.props.jugador)
    // console.log("actividadID: ",this.props.actividad)
    // console.log("mins: ",this.state.currentTimeMin)
    // console.log("sec: ",this.state.currentTimeSec)
    clearInterval(this.watch);
  };

  pace = () => {
    this.setState({ currentTimeMs: this.state.currentTimeMs + 10 });
    if (this.state.currentTimeMs >= 1000) {
      this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
      this.setState({ currentTimeMs: 0 });
    }
    if (this.state.currentTimeSec >= 60) {
      this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
      this.setState({ currentTimeSec: 0 });
    }
  };

  reset = () => {
    this.setState({
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    });
  };

  render() {
    return (

      <div className={'stopwatch'} style={{
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        fontSize: "20px",
        fontFamily: "Arial",
        textAlign: "center",
        
      }}>

    
        <h4 ref="header">Tiempo:</h4>
        {(this.state.running === false && this.state.finalizar === false ) && (
          <button  style={{
            margin: "5px ",
          }}
          onClick={this.start}>Iniciar</button>
        )}
        {this.state.running === true && this.state.finalizar === false  &&(
          <button style={{
            margin: "5px ",
          }} onClick={this.stop}>Detener</button>
        )}

{ this.state.finalizar === false  &&(
         <button style={{
          margin: "5px ",
        }} onClick={this.reset}>Reiniciar</button>
        )}

{ this.state.finalizar === false  &&(
           <button style={{
            margin: "5px ",
          }} onClick={() => this.ingresarTiempoJugador(this.props.entrenamiento,this.props.jugador,this.props.actividad)}>Finalizar</button>
        )}

{ this.state.finalizar === true  &&(
                <h4 ref="header">Finalizada</h4>
        )}
        <StopwatchDisplay
          ref="display"
          {...this.state}
          formatTime={this.formatTime}
        />
     
      </div>
    );
  }
}

export default Stopwatch;

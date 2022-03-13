import React from "react";
import StopwatchDisplay from "./StopwatchDisplay.jsx";

class TiempoJugadoresPartido extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      running: false,
      currentTimeMin: this.props.min,
      currentTimeSec: this.props.sec,
      currentTimeMs: this.props.mls,
      currentTimeMinPlayed: this.props.minPlayed,
      currentTimeSecPlayed: this.props.secPlayed,
      currentTimeMsPlayed: this.props.mlsPlayed,
      open: false,
      notificacion: this.props.notificacion,
    };
  }

  componentDidMount() {
    if (this.props.iniciar) {
      this.start();
    } else {
      this.stop();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Uso tipico (no olvides de comparar las props):

    if (prevProps.iniciar !== this.props.iniciar) {
      if (this.props.iniciar) {
        this.start();
      } else {
        this.stop();
      }
    }

    if (prevState.currentTimeSec !== this.state.currentTimeSec) {
      this.notificarTiempo();
    }
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  notificarTiempo = () => {
    if (7 <= this.state.currentTimeMin && this.state.notificacion === false) {
      this.setState({ notificacion: true });
      this.props.handleNotificacion(this.props.jugador);
    }
  };

  formatTime = (val, ...rest) => {
    let value = val.toString();
    if (value.length < 2) {
      value = "0" + value;
    }
    if (rest[0] === "ms" && value.length < 3) {
      value = "0" + value;
    }
    return value;
  };

  start = () => {
    this.setState({ running: true });
    this.watch = setInterval(() => this.pace(), 10);
  };

  stop = () => {
    this.setState({ running: false });
    this.sumTimePlayed();
    clearInterval(this.watch);
    this.reset();
  };

  sumTimePlayed = () => {
    this.setState({
      currentTimeMinPlayed:
        this.state.currentTimeMinPlayed + this.state.currentTimeMin,
    });
    this.setState({
      currentTimeSecPlayed:
        this.state.currentTimeSecPlayed + this.state.currentTimeSec,
    });
    this.setState({
      currentTimeMsPlayed:
        this.state.currentTimeMsPlayed + this.state.currentTimeMs,
    });
    console.log(this.state.currentTimeSecPlayed);
  };

  reset = () => {
    this.setState({ currentTimeMin: 0 });
    this.setState({ currentTimeSec: 0 });
    this.setState({ currentTimeMs: 0 });
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

  render() {
    return (
      <>
        <div
          className={"stopwatch"}
          style={{
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            fontSize: "20px",
            fontFamily: "Arial",
            textAlign: "center",
          }}
        >
          <h4
            style={{
              fontSize: "25px",
            }}
            ref="header"
          >
            Tiempo del Juego
          </h4>
          <StopwatchDisplay
            ref="display"
            {...this.state}
            formatTime={this.formatTime}
          />
        </div>
      </>
    );
  }
}

export default TiempoJugadoresPartido;

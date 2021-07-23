import React from "react";
import ReactDOM from "react-dom";
import StopwatchDisplay from "./StopwatchDisplay.jsx";
import { Snackbar, Button, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

class TiempoJugadoresPartido extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      running: false,
      currentTimeMin: this.props.min,
      currentTimeSec: this.props.sec,
      currentTimeMs: this.props.mls,
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
    if (30 <= this.state.currentTimeSec && this.state.notificacion === false) {
      //this.handleClick();
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

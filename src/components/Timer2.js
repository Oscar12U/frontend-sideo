import React, { Component } from "react";
import "./style/Timer.css";

class Timer2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTimeMin: this.props.min,
      currentTimeSec: this.props.sec,
      currentTimeMs: this.props.mls,
      running: false,
      periodo: 1,
      btnPlayPause: "Iniciar",
    };

    this.counter = null;
    this.initTimer = this.initTimer.bind(this);
    this.initTimerAutomatico = this.initTimerAutomatico.bind(this);
    //this.clearTimer = this.clearTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.endPeriod = this.endPeriod.bind(this);
  }

  componentDidMount() {
    this.initTimerAutomatico();
  }

  componentDidUpdate(prevProps) {
    // Uso tipico (no olvides de comparar las props):
    console.log("entra update " + this.props.sec);
    if (prevProps.min !== this.props.min) {
      this.setState({ currentTimeMin: this.props.min });
      console.log("entraaaaaaaaaaaaaaaaaaaaaa min");
    }
    if (prevProps.sec !== this.props.sec) {
      this.setState({ currentTimeSec: this.props.sec });
      console.log("entraaaaaaaaaaaaaaaaaaaaaa sec");
    }
  }

  initTimerAutomatico() {
    if (!this.props.running) {
      this.pauseTimer();
      this.setState({ btnPlayPause: "Iniciar" });
    } else {
      this.start();
      this.setState({ btnPlayPause: "Pausar" });
    }
  }

  initTimer() {
    if (!this.state.running) {
      this.start();
      this.setState({ btnPlayPause: "Pausar" });
    } else {
      this.pauseTimer();
      this.setState({ btnPlayPause: "Iniciar" });
    }
    this.props.handleTime();
  }

  pauseTimer() {
    this.setState({ running: false });
  }

  endPeriod() {
    this.setState({
      running: false,
    });

    this.setState({ btnPlayPause: "Iniciar" });
    this.props.handleEndPeriodo();
  }

  //NUEVO

  formatTime = (val, ...rest) => {
    let value = val.toString();
    if (value.length < 2) {
      value = "0" + value;
    }

    return value;
  };

  start = () => {
    this.setState({ running: true });
  };

  render() {
    return (
      <div className="timer">
        <br></br>
        <br></br>
        <br></br>
        <div className="time">
          {/* <img src={cronometroImage} alt="" /> */}
          {/* <h2>{this.state.actualTime.toFixed(0)}</h2> */}
          <span>
            {this.formatTime(this.state.currentTimeMin)}:
            {this.formatTime(this.state.currentTimeSec)}
          </span>
        </div>
        <br></br>
        <br></br>
        <div className="btns">
          <input
            type="button"
            value={this.state.btnPlayPause}
            onClick={this.initTimer}
          />
          {/* <input type="button" value="Reiniciar" onClick={this.clearTimer} /> */}
          <input
            type="button"
            value="Finalizar Periodo"
            onClick={this.endPeriod}
          />
        </div>
      </div>
    );
  }
}

export default Timer2;

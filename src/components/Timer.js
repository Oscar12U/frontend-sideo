import React, { Component, memo } from "react";
import cronometroImage from "../assets/images/cronometronegro.png";
import "./style/Timer.css";

class Timer extends Component {
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
    this.pauseTimer = this.pauseTimer.bind(this);
    this.endPeriod = this.endPeriod.bind(this);
  }

  componentDidMount() {
    this.initTimerAutomatico();
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
    clearInterval(this.counter);
    this.setState({ running: false });
  }

  endPeriod() {
    this.setState({
      actualTime: 0,
      currentTimeMin: 0,
      currentTimeSec: 0,
      currentTimeMs: 0,
      running: false,
    });
    clearInterval(this.counter);
    this.counter = null;
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
    this.counter = setInterval(() => this.pace(), 10);
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
      <div className="timer">
        <br></br>
        <br></br>
        <br></br>
        <div className="time">
          <span
            style={{
              fontSize: "25px",
            }}
          >
            {this.formatTime(this.state.currentTimeMin)}:
            {this.formatTime(this.state.currentTimeSec)}
          </span>
        </div>
        <br></br>
        <br></br>
        <div className="btns">
          <input
            style={{
              justifyContent: "center",
              justifySelf: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: "15px",
              display: "inline-block",
              backgroundColor: "#287ACC",
              color: "#FFFFFF",
              borderRadius: "3px",
              fontWeight: "bold",
            }}
            type="button"
            value={this.state.btnPlayPause}
            onClick={this.initTimer}
          />
          <input
            style={{
              justifyContent: "center",
              justifySelf: "center",
              alignItems: "center",
              textAlign: "center",
              fontSize: "15px",
              display: "inline-block",
              backgroundColor: "#287ACC",
              color: "#FFFFFF",
              borderRadius: "3px",
              fontWeight: "bold",
            }}
            type="button"
            value={"Finalizar Periodo"}
            onClick={this.endPeriod}
          />
        </div>
      </div>
    );
  }
}

export default Timer;

import React, { Component, memo } from "react";
import cronometroImage from "../assets/images/cronometronegro.png";
import "./style/Timer.css";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actualTime: this.props.time2,
      periodo: 1,
      btnPlayPause: "Iniciar",
    };

    this.counter = null;
    this.initTimer = this.initTimer.bind(this);
    this.initTimerAutomatico = this.initTimerAutomatico.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.endPeriod = this.endPeriod.bind(this);
  }

  componentDidMount() {
    this.initTimerAutomatico();
  }

  initTimerAutomatico() {
    console.log(this.props.running);
    if (!this.props.running) {
      this.pauseTimer();
      this.setState({ btnPlayPause: "Iniciar" });
    } else {
      this.counter = setInterval(() => {
        this.setState({ actualTime: this.state.actualTime + 1 });
      }, 1000);
      //60000
      this.setState({ btnPlayPause: "Pausar" });
    }
  }

  initTimer() {
    if (!this.props.running) {
      this.counter = setInterval(() => {
        this.setState({ actualTime: this.state.actualTime + 1 });
      }, 1000);
      //60000
      this.setState({ btnPlayPause: "Pausar" });
    } else {
      this.pauseTimer();
      this.setState({ btnPlayPause: "Iniciar" });
    }
    this.props.handleTime();
  }

  pauseTimer() {
    clearInterval(this.counter);
    this.counter = null;
  }

  clearTimer() {
    this.setState({ actualTime: 0 });
    clearInterval(this.counter);
    this.counter = null;
    this.setState({ btnPlayPause: "Iniciar" });
    this.props.handleClearTimer();
  }

  endPeriod() {
    this.props.handleEndPeriodo();
  }

  render() {
    return (
      <div className="timer">
        <br></br>
        <br></br>
        <br></br>
        <div className="time">
          <img src={cronometroImage} alt="" />
          <h2>{this.state.actualTime.toFixed(0)}</h2>
        </div>
        <br></br>
        <br></br>
        <div className="btns">
          <input
            type="button"
            value={this.state.btnPlayPause}
            onClick={this.initTimer}
          />
          <input type="button" value="Reiniciar" onClick={this.clearTimer} />
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

export default Timer;

import React, { Component } from "react";
import cronometroImage from "../assets/images/cronometronegro.png";
import "./style/Timer.css";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actualTime: 0,
      btnPlayPause: "Iniciar",
    };

    this.counter = null;
    this.initTimer = this.initTimer.bind(this);
    this.clearTimer = this.clearTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
  }

  initTimer() {
    if (this.counter) {
      this.pauseTimer();
      this.setState({ btnPlayPause: "Iniciar" });
    } else {
      this.counter = setInterval(() => {
        this.setState({ actualTime: this.state.actualTime + 1 });
      }, 60000);
      this.setState({ btnPlayPause: "Pausar" });
    }
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
  }

  render() {
    return (
      <div className="timer">
        <div className="time">
          <img src={cronometroImage} alt="" />
          <h2>{this.state.actualTime.toFixed(0)}</h2>
        </div>
        <div className="btns">
          <input
            type="button"
            value={this.state.btnPlayPause}
            onClick={this.initTimer}
          />
          <input type="button" value="Reiniciar" onClick={this.clearTimer} />
        </div>
      </div>
    );
  }
}

export default Timer;

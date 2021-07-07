export default class GestorJugadorTimer {
  constructor(props, nombre, running, min, sec, mls) {
    super(props);
    this.nombre = nombre;
    this.running = false;
    this.min = 0;
    this.sec = 0;
    this.mls = 0;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nombre) {
    this._nombre = nombre;
  }

  get running() {
    return this._running;
  }

  set running(running) {
    this._running = running;
  }

  get min() {
    return this._min;
  }

  set min(min) {
    this._min = min;
  }

  get sec() {
    return this._sec;
  }

  set sec(sec) {
    this._sec = sec;
  }

  get mls() {
    return this._mls;
  }

  set mls(mls) {
    this._mls = mls;
  }

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

  inicioAutomatico() {
    //console.log("aqui va el boleano",this.props.iniciar)
    if (this.props.iniciar && this.state.finalizar === false) {
      if (!this.state.running) {
        this.start();
      }
    }
  }

  start = () => {
    if (!this.state.running) {
      this.watch = setInterval(() => this.pace(), 10);
    }
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

  reset = () => {
    this.setState({
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    });
  };
}

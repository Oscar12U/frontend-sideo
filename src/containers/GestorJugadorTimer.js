export default class GestorJugadorTimer {
  constructor(nombre) {
    this.nombre = nombre;
    this.running = false;
    this.notificacion = false;
    this.min = 0;
    this.sec = 0;
    this.mls = 0;
    this.minPlayed = 0;
    this.secPlayed = 0;
    this.mlsPlayed = 0;
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

  get notificacion() {
    return this._notificacion;
  }

  set notificacion(notificacion) {
    this._notificacion = notificacion;
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

  get minPlayed() {
    return this._minPlayed;
  }

  set minPlayed(minPlayed) {
    this._minPlayed = minPlayed;
  }

  get secPlayed() {
    return this._secPlayed;
  }

  set secPlayed(secPlayed) {
    this._secPlayed = secPlayed;
  }

  get mlsPlayed() {
    return this._mlsPlayed;
  }

  set mlsPlayed(mlsPlayed) {
    this._mlsPlayed = mlsPlayed;
  }

  start = () => {
    if (!this.running) {
      this.watch = setInterval(() => this.pace(), 10);
    }
  };

  stop = () => {
    this._running = false;
    clearInterval(this.watch);
  };

  pace = () => {
    this._mls = this.mls + 10;
    if (this._mls >= 1000) {
      this._sec = this.sec + 1;
      this._mls = 0;
    }
    if (this.sec >= 60) {
      this._min = this.min + 1;
      this._sec = 0;
    }
  };

  reset = () => {
    this._mls = 0;
    this._sec = 0;
    this._min = 0;
  };

  sumTimePlayed = () => {
    this._minPlayed += this.min;
    this._secPlayed += this.sec;
    this._mlsPlayed += this.mls;
    console.log(this.secPlayed);
  };
}

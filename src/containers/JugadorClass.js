export default class JugadorClass {
  constructor(nombre) {
    this.nombre = nombre;
    this.timeMin = 0;
    this.timeSec = 0;
    this.timeMs = 0;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nombre) {
    this._nombre = nombre;
  }

  get timeMin() {
    return this._timeMin;
  }

  set timeMin(timeMin) {
    this._timeMin = timeMin;
  }

  get timeSec() {
    return this._timeSec;
  }

  set timeSec(timeSec) {
    this._timeSec = timeSec;
  }
  get timeMs() {
    return this._timeMs;
  }

  set timeMs(timeMs) {
    this._timeMs = timeMs;
  }
}

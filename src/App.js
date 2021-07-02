//import './App.css';
import React from "react";
//import Home from "./pages/Home";
import Partido from "./pages/Partido";
import Temporada from "./pages/Temporada";
import MenuJugador from "./pages/MenuJugador";
import VerJugador from "./pages/VerJugador";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TemporadaInit from "./pages/TemporadaInit";
import Inicio from "./pages/Inicio";
import Entrenamiento from "./pages/Entrenamiento";
function App() {
  return (
    <>
      <Router>
        <Route exact path="/">
          <Inicio></Inicio>
        </Route>
        <Route path="/Partido">
          <Partido></Partido>
        </Route>
        <Route path="/TemporadaInit">
          <TemporadaInit></TemporadaInit>
        </Route>
        <Route path="/Temporada">
          <Temporada></Temporada>
        </Route>

        <Route path="/menuJugador">
          <MenuJugador></MenuJugador>
        </Route>

        <Route path="/verJugador">
          <VerJugador></VerJugador>
        </Route>

        <Route path="/Entrenamiento">
          <Entrenamiento></Entrenamiento>
        </Route>
      </Router>
    </>
  );
}
export default App;

//import './App.css';
import React from "react";
import Home from "./pages/Home";
//import Partido from "./pages/Partido";
import Temporada from "./pages/Temporada";
import MenuJugador from "./pages/MenuJugador";
import VerJugador from "./pages/VerJugador";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/">
          <Temporada></Temporada>
        </Route>

        <Route path="/topAnime">
          {/* <Partido></Partido> */}
        </Route>

        <Route path="/menuJugador">
          <MenuJugador></MenuJugador>
        </Route>

        <Route path="/verJugador">
          <VerJugador></VerJugador>
        </Route>

      </Router>
    </>
  );
}
export default App;

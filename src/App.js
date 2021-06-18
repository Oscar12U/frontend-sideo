//import './App.css';
import React from "react";
//import Home from "./pages/Home";
import Partido from "./pages/Partido";
import Temporada from "./pages/Temporada";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TemporadaInit from "./pages/TemporadaInit";
import Inicio from "./pages/Inicio";

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
      </Router>
    </>
  );
}
export default App;

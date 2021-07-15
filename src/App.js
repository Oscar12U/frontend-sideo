import React from "react";
import Partido from "./pages/Partido";
import Temporada from "./pages/Temporada";
import MenuJugador from "./pages/MenuJugador";
import VerJugador from "./pages/VerJugador";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TemporadaInit from "./pages/TemporadaInit";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import IniciarSesion from "./components/IniciarSesion";
import LoginComponent from "./components/LoginComponent";
import Entrenamiento from "./pages/Entrenamiento";
import Estadisticas from "./pages/Estadisticas";

function App() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    console.log("IF 1 ", token);
    return <IniciarSesion />;
  }

  if (token) {
    console.log("IF 2 ", token);
    return (
      <>
        <BrowserRouter>
          <Switch>
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

            <Route path="/iniciarSesion">
              <Login></Login>
            </Route>

            {/* <Route path="/recuperarContrasena">
              <RecuperarContrasena></RecuperarContrasena>
            </Route> */}

            <Route path="/registrarse">
              <LoginComponent></LoginComponent>
            </Route>

            <Route path="/Entrenamiento">
              <Entrenamiento></Entrenamiento>
            </Route>

            <Route path="/Estadisticas">
              <Estadisticas></Estadisticas>
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}
export default App;

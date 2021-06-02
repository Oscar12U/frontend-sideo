//import './App.css';
import React from "react";
//import Home from "./pages/Home";
import Partido from "./pages/Partido";
import Temporada from "./pages/Temporada";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/">
          <Temporada></Temporada>
        </Route>

        <Route path="/Partido">
           <Partido></Partido> 
        </Route>

      </Router>
    </>
  );
}
export default App;

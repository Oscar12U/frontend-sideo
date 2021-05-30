import './App.css';
import React from "react";
import Home from "../pages/Home";
import Partido from "../pages/Partido";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/">
          <Home></Home>
        </Route>

        <Route path="/topAnime">
          <Partido></Partido>
        </Route>

      </Router>
    </>
  );
}
export default App;

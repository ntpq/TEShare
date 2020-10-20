import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import About from "./page/about";
import Home from "./page/home";
import Nav from "./page/nav";
import Regis from "./page/regis";
import Login from "./page/login";
function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/regis" component={Regis} />
        <Route path="/login" component={Login} />
      </Router>
    </div>
  );
}

export default App;

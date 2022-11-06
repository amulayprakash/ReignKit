import React, { useState, useEffect } from "react";
import RoyalityPass from "./components/RoyalityPass/RoyalityPass";
import { Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";

import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={() => <Auth />} />
      <Route exact path="/buypass" component={() => <RoyalityPass />} />
    </Switch>
  );
}

export default App;

import React from "react";

import Main from "components/Main";
import { BrowserRouter as Router } from "react-router-dom";

import "./app.css";
import "./common/i18n";

const App = () => (
  <Router>
    <Main />
  </Router>
);

export default App;

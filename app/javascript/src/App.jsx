import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import Main from "components/Main";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import queryClient from "utils/queryClient";

import { setAuthHeaders } from "./apis/axios";
import "./app.css";
import "./common/i18n";

const App = () => {
  setAuthHeaders();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer />
        <Main />
      </Router>
    </QueryClientProvider>
  );
};

export default App;

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyle from "./Components/GlobalStyle/GlobalStyle";

const root = document.getElementById("root");
ReactDOM.render(
  <GlobalStyle>
    <App />
  </GlobalStyle>,
  root
);

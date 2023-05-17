import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Chatbot from "./components/Chat/Chatbot";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <Router>
          {/* <Chatbot></Chatbot> */}
          <App />
        </Router>
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);

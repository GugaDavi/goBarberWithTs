import React from "react";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import "./config/ReactotronConfig";

import Routes from "./routes";
import Globalstyles from "./styles/global";
import history from "./services/history";

import { store, persist } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <Router history={history}>
          <Routes />
          <Globalstyles />
          <ToastContainer />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

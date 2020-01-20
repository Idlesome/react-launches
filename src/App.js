import React from "react";

import { Provider } from "react-redux";

import Launches from "containers/Launches";

import configureStore from "./init";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Launches />
  </Provider>
);

export default App;

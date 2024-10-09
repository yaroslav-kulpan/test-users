import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

import "./index.css";
import App from "./App";

import { store } from "./redux/store";

const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

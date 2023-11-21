import React from "react"
import ReactDOM from "react-dom/client"
import { reduxStore } from "./libs";
import App from "./App.jsx"
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>,
)

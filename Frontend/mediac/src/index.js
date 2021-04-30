import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import "bootstrap/dist/css/bootstrap.min.css"
import { render } from 'react-snapshot'

 render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

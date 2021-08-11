import React from "react"
import { render } from 'react-snapshot';

import ReactDOM from "react-dom"
import App from "./components/App"
import "bootstrap/dist/css/bootstrap.min.css"
 
 
// ReactDOM.render(
// render(
//     <App/>,
//     document.getElementById('root')
//   )
// )
 ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)

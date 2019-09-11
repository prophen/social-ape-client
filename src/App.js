import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import jwtDecode from "jwt-decode"
//Redux
import { Provider } from "react-redux"
import store from "./redux/store"

import themeFile from "./util/theme"
// Components
import Navbar from "./components/Navbar"
import AuthRoute from "./util/AuthRoute"
// Pages
import home from "./pages/home"
import login from "./pages/login"
import signup from "./pages/signup"

const theme = createMuiTheme(themeFile)

let authenticated
const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  console.log(decodedToken)
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login"
    authenticated = false
  } else {
    authenticated = true
  }
}
function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute
                exact
                path="/login"
                component={login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </Provider>
  )
}

export default App

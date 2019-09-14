import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import MyButton from "../util/MyButton"
// MUI

import AppBar from "@material-ui/core/AppBar/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
// Icons
import AddIcon from "@material-ui/icons/Add"
import HomeIcon from "@material-ui/icons/Home"
import Notifications from "@material-ui/icons/Notifications"

class Navbar extends Component {
  render() {
    const { authenticated } = this.props
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <>
              <MyButton tip="Post a Scream!">
                <AddIcon />
              </MyButton>
              <MyButton tip="Home">
                <Link to="/">
                  <HomeIcon />
                </Link>
              </MyButton>
              <MyButton tip="Notifications">
                <Notifications />
              </MyButton>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}
Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
  authenticated: state.user.authenticated
})
export default connect(mapStateToProps)(Navbar)

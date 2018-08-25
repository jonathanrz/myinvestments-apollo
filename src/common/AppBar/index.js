import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'

import theme from 'app/theme'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

const siderLinks = [
  { label: 'Dashboard', to: '/', icon: <HomeIcon /> },
  { label: 'Investimentos do Mês', to: '/investmentsOfMonth', icon: <CalendarTodayIcon /> }
]

class ButtonAppBar extends Component {
  state = {
    redirectTo: null,
    menuOpen: false
  }

  toggleDrawer = state => () => this.setState({ menuOpen: state })

  render() {
    const { redirectTo, menuOpen } = this.state

    if (redirectTo) {
      return <Redirect to={{ pathname: redirectTo }} push />
    }

    const { classes, title, menus = [], children, location } = this.props

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon onClick={this.toggleDrawer(true)} />
              </IconButton>
              <Typography variant="title" color="inherit" className={classes.flex}>
                {title}
              </Typography>
              {menus.map((menu, index) => (
                <Button
                  color="inherit"
                  key={index}
                  onClick={() => this.setState({ redirectTo: menu.to })}
                >
                  {menu.label}
                </Button>
              ))}
            </Toolbar>
            <Drawer open={menuOpen} onClose={this.toggleDrawer(false)}>
              <List component="nav">
                {siderLinks.filter(link => link.to !== location.pathname).map((link, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => this.setState({ redirectTo: link.to })}
                  >
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText primary={link.label} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </AppBar>
          {children}
        </div>
      </ThemeProvider>
    )
  }
}

export default withStyles(styles)(withRouter(ButtonAppBar))

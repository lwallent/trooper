import React from "react";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Router, Route, Switch } from "react-router-dom";
import { Profile } from "./components/user/Profile";
import { PrivateRoute } from './components/security/PrivateRoute';
import history from "./lib/history";
import { CssBaseline } from '@material-ui/core';
import { TrooperHeader } from './components/basic-ui/TrooperHeader';
import { TrooperMenu, MENU_WIDTH } from './components/basic-ui/TrooperMenu';
import ProjectsPage from './components/projects/ProjectsPage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  contentTop: {
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -MENU_WIDTH,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export const App = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Router history={history}>
        <CssBaseline />
        <TrooperHeader onBurgerClick={handleDrawerOpen} isMenuOpen={open}></TrooperHeader>
        <TrooperMenu onMenuCollapseClick={handleDrawerClose} isMenuOpen={open} history={history}></TrooperMenu>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.contentTop} />
          
          <Switch>
            <Route path="/" exact />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/projects" component={ProjectsPage} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}
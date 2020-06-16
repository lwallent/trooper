import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, IconButton, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountTree from '@material-ui/icons/AccountTree';
import Person from '@material-ui/icons/Person';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {History } from 'history'

import { useAuth0 } from '../../react-auth0-spa';
import { useHistory } from 'react-router-dom';

export const MENU_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
      width: MENU_WIDTH,
      flexShrink: 0,
    },
    drawerPaper: {
      width: MENU_WIDTH,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }
  }));

  export interface TrooperMenuProps {
    onMenuCollapseClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isMenuOpen: boolean;
}

export const TrooperMenu = (props: TrooperMenuProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.isMenuOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={props.onMenuCollapseClick}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        <List>
            <ListItem button onClick={() => history.push('/projects') }>
              <ListItemIcon><AccountTree/></ListItemIcon>
              <ListItemText primary="Projects" />
            </ListItem>

            <ListItem button onClick={() => history.push('/profile') }>
              <ListItemIcon><Person/></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>

            {!isAuthenticated && (
            <ListItem button onClick={() => loginWithRedirect({})}>
                <ListItemText primary="Log in" />
            </ListItem>
            )}

            {isAuthenticated && (
                <ListItem button onClick={() => logout()}>
                    <ListItemIcon> <ExitToApp /> </ListItemIcon>
                    <ListItemText primary="Log out" />
                </ListItem>
            )}
        </List>
      </Drawer>
    );
}
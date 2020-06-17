import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Tabs, Tab } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { MENU_WIDTH } from './TrooperMenu';
import { yellow } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${MENU_WIDTH}px)`,
      marginLeft: MENU_WIDTH,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    tabIndicator: {
      backgroundColor: 'white'
    },
    toolbar: {
      display: 'flex'
    },
    grow: {
      flexGrow: 1
    }
}));

export interface TrooperHeaderProps {
    onBurgerClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isMenuOpen: boolean;
}

export const TrooperHeader = (props: TrooperHeaderProps) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.isMenuOpen,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.onBurgerClick}
            edge="start"
            className={clsx(classes.menuButton, props.isMenuOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap>
            Trooper Goal
          </Typography>
          <span className={classes.grow}></span>
          <Tabs value={value}  classes={{ indicator: classes.tabIndicator  }}>
            <Tab label="Tree"  />
            <Tab label="Swim lane"  />
            <Tab label="Playground" />
          </Tabs>
        </Toolbar>
       
      </AppBar>
    );
}
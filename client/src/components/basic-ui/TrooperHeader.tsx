import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Tabs, Tab } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { MENU_WIDTH } from './TrooperMenu';

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
    views?: string[];
    title?: string;
}

export const TrooperHeader = (props: TrooperHeaderProps) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

   const viewTabs = props.views ?  (
    <Tabs value={value}  classes={{ indicator: classes.tabIndicator  }}>
      {props.views.map(view => <Tab label={view}  />)}
    </Tabs>) : undefined;

    const pageTitle = props.title ? ( <Typography variant="subtitle2" noWrap>
    &nbsp;: {props.title}
  </Typography>) : undefined

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
          {pageTitle}
          <span className={classes.grow}></span>
          {viewTabs}
        </Toolbar>
       
      </AppBar>
    );
}
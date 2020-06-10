import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
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
}));

export interface TrooperHeaderProps {
    onBurgerClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    isMenuOpen: boolean;
}

export const TrooperHeader = (props: TrooperHeaderProps) => {
    const classes = useStyles();

    return (
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.isMenuOpen,
        })}
      >
        <Toolbar>
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
        </Toolbar>
      </AppBar>
    );
}
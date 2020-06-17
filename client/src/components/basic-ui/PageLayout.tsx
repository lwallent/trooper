import clsx from 'clsx';
import { makeStyles, CssBaseline } from '@material-ui/core';
import { MENU_WIDTH, TrooperMenu } from './TrooperMenu';
import React, { ReactNode } from 'react';
import { TrooperHeader } from './TrooperHeader';

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
export interface PageLayoutProps {
    children: ReactNode;
    views?: string[];

    title?: string;
}

export const PageLayout = (props: PageLayoutProps) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <TrooperHeader onBurgerClick={handleDrawerOpen} isMenuOpen={open} views={props.views} title={props.title}></TrooperHeader>
            <TrooperMenu onMenuCollapseClick={handleDrawerClose} isMenuOpen={open} ></TrooperMenu>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.contentTop} />
                { props.children }
            </main>
        </div >
    );
}
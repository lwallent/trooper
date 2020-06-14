import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import AccountTree from '@material-ui/icons/AccountTree';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ProjectModel } from '../../models/ProjectModel';
import { Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  description: {
    height: 100
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  },
}));

export interface ProjectCardProps {
    project: ProjectModel;
    onDeleteProject: (id: string) => void;
}

export const ProjectCard = (props: ProjectCardProps) =>  {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const handleProjectDelete = (id?: string) => {
    if (id) {
      props.onDeleteProject(id);
    }
    handleMenuClose();
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
           <AccountTree/>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        }
        title={props.project.name}
        subheader="TEMP"
        // {new Intl.DateTimeFormat("en-GB", {
        //     year: "numeric",
        //     month: "long",
        //     day: "2-digit"
        //   }).format(props.project.modified)}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={()=>handleProjectDelete(props.project.id)}>Delete</MenuItem>
      </Menu>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {props.project.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

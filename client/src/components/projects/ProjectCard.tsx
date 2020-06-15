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
import DeleteIcon from '@material-ui/icons/Delete';
import { ProjectModel } from '../../models/ProjectModel';
import {  CardActionArea } from '@material-ui/core';

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
    onOpenProject: (id: string) => void;
}

export const ProjectCard = (props: ProjectCardProps) =>  {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => props.onOpenProject(props.project.id)}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
           <AccountTree/>
          </Avatar>
        }
        title={props.project.name}
        subheader="TEMP"
        // {new Intl.DateTimeFormat("en-GB", {
        //     year: "numeric",
        //     month: "long",
        //     day: "2-digit"
        //   }).format(props.project.modified)}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {props.project.description}
        </Typography>
      </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="settings" onClick={() => props.onDeleteProject(props.project.id)}>
            <DeleteIcon />
          </IconButton>
      </CardActions>
    </Card>
  );
}

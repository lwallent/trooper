import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ProjectCard } from './ProjectCard';

/**
 * Temp Project Dummies - removed shortly
 */
const projects = [
    {
        title: 'Amazing Stories',
        description: 'Phasellus a turpis tincidunt libero efficitur efficitur non cursus tortor. Pellentesque at erat tempor, dapibus tellus vitae, hendrerit elit. Donec ut quam mauris. Praesent ultricies augue ut turpis tincidunt bibendum. Phasellus ultrices lacinia purus egestas auctor. In lacus lectus, dignissim at bibendum',
        created: Date.now(),
        modified: Date.now()
    },
    {
        title: 'Rick & Morthy',
        description: '',
        created: Date.now(),
        modified: Date.now()
    },
    {
        title: 'Trooper Goal',
        description: '',
        created: Date.now(),
        modified: Date.now()
    },
    {
        title: 'House Rebuild',
        description: '',
        created: Date.now(),
        modified: Date.now()
    }
];


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
export const ProjectsPage = () => {

    const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>        
        {projects.map(project => (
          <Grid item xs={12} sm={4}>
            <ProjectCard project={project}></ProjectCard>
          </Grid>
        ))}

      </Grid>
    </div>
  );
}
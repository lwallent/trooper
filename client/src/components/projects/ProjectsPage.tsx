import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ProjectCard } from './ProjectCard';
import { useAuth0 } from '../../react-auth0-spa';
import { restGet, restCreate } from '../../api/rest-api';
import { Button } from '@material-ui/core';
import { NewProjectDialog } from './NewProjectDialog';
import { ProjectModel } from '../../models/ProjectModel';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    buttonNew: {
      margin: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
export const ProjectsPage = () => {
    const [newProjectOpen, setOpenNewProject] = React.useState(false);
    const [loadTrigger, setLoadTrigger] = React.useState(false);
    const [projects, setProjects] = React.useState<ProjectModel[]>([]);
    const classes = useStyles();
    const { getTokenSilently } = useAuth0();

    useEffect(()=> {
      const loadProjects = async () => {
        const token = await getTokenSilently();

        if (token) {
          const projects = await restGet(token, 'http://0.0.0.0:8083/rest/projects');
          setProjects(projects);
        }
      }
      
      loadProjects();
      
    }, [loadTrigger, getTokenSilently]);
   
    const createProject = async () => {
      setOpenNewProject(true);
    }

    const handleNewProject = async (project: ProjectModel | undefined) => {

      if (project) {
        const token = await getTokenSilently();
  
        if (token) {
          const returned = await restCreate<ProjectModel>(token, 'http://0.0.0.0:8083/rest/projects', project);
          setLoadTrigger(!loadTrigger);
        }
      }

      setOpenNewProject(false);
    }

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={createProject} className={classes.buttonNew}>
          New
      </Button>
      <NewProjectDialog open={newProjectOpen} onClose={handleNewProject}></NewProjectDialog>
      <Grid container spacing={3}>        
        {projects.map(project => (
          <Grid item xs={12} sm={4} key={project.id}>
            <ProjectCard project={project}></ProjectCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
import React, { useEffect, Dispatch } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ProjectCard } from './ProjectCard';
import { useAuth0 } from '../../react-auth0-spa';
import { restGet, restCreate } from '../../api/rest-api';
import { Button } from '@material-ui/core';
import { NewProjectDialog } from './NewProjectDialog';
import { ProjectModel } from '../../models/ProjectModel';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { createProject, deleteProject, fetchProjects, ProjectActionTypes } from '../../redux/actions/projectActions';

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
  
const ProjectsPage = (props: Props) => {
    const [newProjectOpen, setOpenNewProject] = React.useState(false);
    const classes = useStyles();

    useEffect(()=> {
      props.fetchProjects();
    }, []);
   
    const createProject = async () => {
      setOpenNewProject(true);
    }

    const handleNewProject = async (project: ProjectModel | undefined) => {

      if (project) {
        props.createProject(project);
        //props.dispatch();

        // const token = await getTokenSilently();
  
        // if (token) {
        //   const returned = await restCreate<ProjectModel>(token, 'http://0.0.0.0:8083/rest/projects', project);
        // }
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
        {props.projects.map(project => (
          <Grid item xs={12} sm={4} key={project.id}>
            <ProjectCard project={project}></ProjectCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

const mapState = ({projectsState}: RootState) => {
  return {
    projects: projectsState.projects
  }
}

const mapDispatch = {
  createProject,
  deleteProject,
  fetchProjects
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux; // Can add Own Props

export default connector(ProjectsPage);
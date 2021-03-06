import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ProjectCard } from './ProjectCard';
import { Button } from '@material-ui/core';
import { NewProjectDialog } from './NewProjectDialog';
import { CreationProjectModel } from '../../models/ProjectModel';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { createProject, deleteProject, fetchProjects } from '../../redux/actions/projectActions';
import { useHistory } from 'react-router-dom';
import { PageLayout } from '../basic-ui/PageLayout';

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

const mapState = ({ projectsState }: RootState) => {
  return {
    ...projectsState
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


const ProjectsPage = (props: Props) => {
  const [newProjectOpen, setOpenNewProject] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (props.dirty) {
      props.fetchProjects();
    }
  }, [props]);

  const createProject = async () => {
    setOpenNewProject(true);
  }

  const handleNewProject = async (project: CreationProjectModel | undefined) => {

    if (project) {
      props.createProject(project);
    }

    setOpenNewProject(false);
  }

  return (
    <PageLayout>
      <div className={classes.root}>
        <Button variant="contained" color="primary" onClick={createProject} className={classes.buttonNew}>
          New
        </Button>
        <NewProjectDialog open={newProjectOpen} onClose={handleNewProject}></NewProjectDialog>
        <Grid container spacing={3}>
          {props.projects.map(project => (
            <Grid item xs={12} sm={4} key={project.id}>
              <ProjectCard project={project} onDeleteProject={(id) => props.deleteProject(id)} onOpenProject={(id) => history.push(`projects/${id}`) }></ProjectCard>
            </Grid>
          ))}
        </Grid>
      </div>
    </PageLayout>
  );
}

export default connector(ProjectsPage);
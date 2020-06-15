import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import { ProjectModel } from '../../models/ProjectModel';
import { fetchProjects } from '../../redux/actions/projectActions';

const mapState = ({ projectsState }: RootState) => {
    return {
      ...projectsState
    }
  }
  
  const mapDispatch = {
    fetchProjects
  }
  
  const connector = connect(mapState, mapDispatch)
  type PropsFromRedux = ConnectedProps<typeof connector>
  type Props = PropsFromRedux; // Can add Own Props
  

const ProjectWorkbenchPage = (props: Props) => {
    const { id } = useParams();
    const [ project, setProject ] = useState<ProjectModel>();

    useEffect(() => {
        if (props.dirty) {
            props.fetchProjects(); // Just load single...
        }
        setProject(props.projects.find(p => p.id === id));
    },[id, props.dirty]);

    return (
        <div>HELLO PROJECT: {project?.name}</div>
    );
}

export default connector(ProjectWorkbenchPage)
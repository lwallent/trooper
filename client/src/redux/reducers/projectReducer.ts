import { ProjectModel } from '../../models/ProjectModel';
import { ProjectActionTypes, DELETE_PROJECT, LOAD_PROJECTS_SUCCESS, CREATE_PROJECT_SUCCESS } from '../actions/projectActions';

export interface ProjectState {
    projects: ProjectModel[];
}

const initialState: ProjectState = {
    projects: []
}

export const projectReducer = (
    state = initialState,
    action: ProjectActionTypes
  ): ProjectState => {
    switch (action.type) {
      case CREATE_PROJECT_SUCCESS:
        return {
          projects: [...state.projects, action.response]
        }
      case DELETE_PROJECT:
        return {
          projects: state.projects.filter(
            project => project.id !== action.meta.id
          )
        }
      case LOAD_PROJECTS_SUCCESS:
        return {
          projects: [...action.response]
        }
      default:
        return state;
    }
  }
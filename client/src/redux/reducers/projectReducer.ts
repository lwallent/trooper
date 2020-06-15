import { ProjectModel } from '../../models/ProjectModel';
import { ProjectActionTypes, LOAD_PROJECTS_SUCCESS, CREATE_PROJECT_SUCCESS, DELETE_PROJECT_SUCCESS } from '../actions/projectActions';

export interface ProjectState {
  dirty: boolean;
  projects: ProjectModel[];
}

const initialState: ProjectState = {
  dirty: true,
  projects: []
}

export const projectReducer = (
  state = initialState,
  action: ProjectActionTypes
): ProjectState => {
  switch (action.type) {
    case CREATE_PROJECT_SUCCESS:
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        dirty: true,
      }
    case LOAD_PROJECTS_SUCCESS:
      return {
        dirty: false,
        projects: [...action.response]
      }
    default:
      return state;
  }
}
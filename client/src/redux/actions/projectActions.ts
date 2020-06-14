import { ProjectModel } from '../../models/ProjectModel'
import { RootState } from '../reducers';
import { Action } from 'redux';
import { CALL_API } from '../middleware/api-middleware';

export const CREATE_PROJECT = 'CREATE_PROJECT'
export const DELETE_PROJECT = 'DELETE_PROJECT'

export const LOAD_PROJECTS_REQUEST = 'LOAD_PROJECTS_REQUEST';
export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS';
export const LOAD_PROJECTS_FAILURE = 'LOAD_PROJECTS_FAILURE';

interface CreateProjectAction {
  type: typeof CREATE_PROJECT
  payload: ProjectModel
}

interface DeleteProjectAction {
  type: typeof DELETE_PROJECT
  meta: {
    id: string;
  }
}

interface LoadProjectsSuccessAction {
    type: typeof LOAD_PROJECTS_SUCCESS
    response: ProjectModel[];
}
  
export type ProjectActionTypes = CreateProjectAction | DeleteProjectAction | LoadProjectsSuccessAction;

export const createProject = (newProject: ProjectModel): ProjectActionTypes => {
    return {
      type: CREATE_PROJECT,
      payload: newProject
    }
  }
  
export const deleteProject = (id: string): ProjectActionTypes => {
    return {
      type: DELETE_PROJECT,
      meta: {
        id
      }
    }
}

export const loadProjectsSuccess = (response: ProjectModel[]): LoadProjectsSuccessAction => {
    return {
      type: LOAD_PROJECTS_SUCCESS,
      response
    }
}
export const fetchProjects = () =>  {
  return {
    [CALL_API]: {
      endpoint: 'projects',
      types: [LOAD_PROJECTS_REQUEST, LOAD_PROJECTS_SUCCESS, LOAD_PROJECTS_FAILURE]
    }
  }
}

// export const createProject = (newProject: ProjectModel) =>  {
//   return {
//     [CALL_API]: {
//       endpoint: 'projects',
//       types: [LOAD_PROJECTS_REQUEST, LOAD_PROJECTS_SUCCESS, LOAD_PROJECTS_FAILURE]
//     }
//   }
// }
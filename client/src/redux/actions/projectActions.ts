import { ProjectModel } from '../../models/ProjectModel'
import { RootState } from '../reducers';
import { Action } from 'redux';
import {  createApiGetAction, createApiCreateAction } from '../middleware/api-middleware';

export const DELETE_PROJECT = 'DELETE_PROJECT'

export const LOAD_PROJECTS_REQUEST = 'LOAD_PROJECTS_REQUEST';
export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS';
export const LOAD_PROJECTS_FAILURE = 'LOAD_PROJECTS_FAILURE';
export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';

interface CreateProjectSuccessAction {
  type: typeof CREATE_PROJECT_SUCCESS
  response: ProjectModel
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
  
export type ProjectActionTypes = CreateProjectSuccessAction | DeleteProjectAction | LoadProjectsSuccessAction;
  
export const deleteProject = (id: string): ProjectActionTypes => {
    return {
      type: DELETE_PROJECT,
      meta: {
        id
      }
    }
}

export const fetchProjects = createApiGetAction('projects', [LOAD_PROJECTS_REQUEST, LOAD_PROJECTS_SUCCESS, LOAD_PROJECTS_FAILURE]);
export const createProject = createApiCreateAction<ProjectModel>('projects', [CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE]);
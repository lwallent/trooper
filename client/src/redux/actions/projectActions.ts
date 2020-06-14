import { ProjectModel } from '../../models/ProjectModel'
import {  createApiGetAction, createApiCreateAction, createApiDeleteAction } from '../middleware/api-middleware';

export const LOAD_PROJECTS_REQUEST = 'LOAD_PROJECTS_REQUEST';
export const LOAD_PROJECTS_SUCCESS = 'LOAD_PROJECTS_SUCCESS';
export const LOAD_PROJECTS_FAILURE = 'LOAD_PROJECTS_FAILURE';
export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECT_FAILURE';
export const DELETE_PROJECT_REQUEST = 'DELETE_PROJECT_REQUEST';
export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS';
export const DELETE_PROJECT_FAILURE = 'DELETE_PROJECT_FAILURE';


interface CreateProjectSuccessAction {
  type: typeof CREATE_PROJECT_SUCCESS;
  response: ProjectModel
}

interface DeleteProjectSuccessAction {
  type: typeof DELETE_PROJECT_SUCCESS;
}
interface LoadProjectsSuccessAction {
    type: typeof LOAD_PROJECTS_SUCCESS;
    response: ProjectModel[];
}
  
export type ProjectActionTypes = CreateProjectSuccessAction | DeleteProjectSuccessAction | LoadProjectsSuccessAction;
  

export const fetchProjects = createApiGetAction('projects', [LOAD_PROJECTS_REQUEST, LOAD_PROJECTS_SUCCESS, LOAD_PROJECTS_FAILURE]);
export const createProject = createApiCreateAction<ProjectModel>('projects', [CREATE_PROJECT_REQUEST, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE]);
export const deleteProject = createApiDeleteAction('projects', [DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE]);
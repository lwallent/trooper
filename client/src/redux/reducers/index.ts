import { projectReducer } from './projectReducer'
import { combineReducers } from 'redux';
//import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
    projectsState: projectReducer,
  //  authState: authReducer
})

export type RootState = ReturnType<typeof rootReducer>
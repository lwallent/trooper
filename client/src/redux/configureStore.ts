
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { apiMiddleware } from './middleware/api-middleware';

export const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(apiMiddleware));
}
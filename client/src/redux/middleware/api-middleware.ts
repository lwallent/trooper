import { Action, Dispatch, MiddlewareAPI } from 'redux'

const BASE_URL = 'http://0.0.0.0:8083/rest/'

const callServer = async (endpoint: string) => {

    let token = localStorage.getItem('id_token') || null
    let config = {}

    // If we have a token - inject it in the header
    if (token) {
        config = {
            headers: { 'Authorization': `Bearer ${token}` }
        }
    }

    try {
        const response = await fetch(BASE_URL + endpoint, config);
        return response.json();
    } catch (err) {
        console.error(err);
    }
}

export const CALL_API = Symbol('Call API');

interface CallDetails {
    endpoint: string;
    types: string[];
}

export interface ApiGetAction extends Action {
    [CALL_API]: CallDetails;
}

type ApiAction = ApiGetAction

export const apiMiddleware = (api: MiddlewareAPI<any>) => (next: Dispatch<Action>) => async (action: ApiAction) => {

    const callAPI = action[CALL_API]

    // So the middleware doesn't get applied to every single action
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    const { endpoint, types } = callAPI;
    const [requestType, successType, errorType] = types;
    
    try {
        // Mark start of action 
        next({type: requestType});

        const response = await callServer(endpoint);

        // Dispatch Success
        next({ response, type: successType });
    } catch (err) {
        next({ error: err.message || 'There was an error.', type: errorType });
    }
}
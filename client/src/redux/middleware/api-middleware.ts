import { Action, Dispatch, MiddlewareAPI } from 'redux'

const BASE_URL = 'http://0.0.0.0:8083/rest/';

export const API_ACTION = 'API_ACTION';

const callServer = async (endpoint: string, options: RequestInit | undefined) => {

    let token = localStorage.getItem('id_token') || null
    let config = Object.assign({}, options);

    // If we have a token - inject it in the header
    if (token) {
        config.headers = Object.assign({}, config.headers, {
             'Authorization': `Bearer ${token}` 
        });
    }

    try {
        const response = await fetch(BASE_URL + endpoint, config);
        return response.json();
    } catch (err) {
        console.error(err);
    }
}

interface ApiCallDetails {
    endpoint: string;
    types: string[];
    options?: RequestInit;
}

export interface ApiAction extends Action {
    payload: ApiCallDetails;
}

export const createApiGetAction = (endpoint: string, types: string[]): () => ApiAction  => {
    return () => ({
        type: API_ACTION,
        payload: { endpoint, types}
    });
}

export const createApiCreateAction = <T> (endpoint: string, types: string[]): (data:T) => ApiAction  => {
        return (data: T) => ({
            type: API_ACTION,
            payload: { 
                endpoint, 
                types,
                options: {
                    body: JSON.stringify(data),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                } 
            }
        });
}


export const apiMiddleware = (api: MiddlewareAPI<any>) => (next: Dispatch<Action>) => async (action: ApiAction) => {

    // So the middleware doesn't get applied to every single action
    if (action.type !== API_ACTION) {
        return next(action)
    }

    const { endpoint, types, options } = action.payload;
    const [requestType, successType, errorType] = types;
    
    try {
        // Mark start of action 
        next({type: requestType});

        const response = await callServer(endpoint, options);

        // Dispatch Success
        next({ response, type: successType });
    } catch (err) {
        next({ error: err.message || 'There was an error.', type: errorType });
    }
}
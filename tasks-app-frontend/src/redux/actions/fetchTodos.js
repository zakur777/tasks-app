import {
    FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,
} from './types';

import axios from 'axios';

export function fetchTodosRequest() {
    return {
        type: FETCH_TODOS_REQUEST,
    };
}

export function fetchTodosSuccess(todos) {
    return {
        type: FETCH_TODOS_SUCCESS,
        todos,
    };
}

export function fetchTodosFailure(error) {
    return {
        type: FETCH_TODOS_FAILURE,
        error,
    };
}

export function fetchTodos() {
    return (dispatch) => {
        dispatch(fetchTodosRequest());
        return axios
            .get(process.env.REACT_APP_API_URL)
            .then((response) => {
                dispatch(fetchTodosSuccess(response.data));
            })
            .catch((error) => {
                dispatch(fetchTodosFailure(error));
            });
    };
}

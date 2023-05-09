import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE } from './types';
import axios from 'axios';

export function addTodoRequest() {
    return {
        type: ADD_TODO_REQUEST,
    };
}

export function addTodoSuccess(todo) {
    return {
        type: ADD_TODO_SUCCESS,
        todo,
    };
}

export function addTodoFailure(error) {
    return {
        type: ADD_TODO_FAILURE,
        error,
    };
}

export function addTodo(text) {
    return (dispatch) => {
        dispatch(addTodoRequest());
        return axios
            .post(process.env.REACT_APP_API_URL, {
                descriptionTask: text,
                completedTask: false,
            })
            .then((response) => {
                dispatch(addTodoSuccess(response.data));
            })
            .catch((error) => {
                dispatch(addTodoFailure(error));
            });
    };
}
